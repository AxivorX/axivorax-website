from pathlib import Path
from datetime import datetime
import subprocess
import json
import re

ROOT = Path.home() / "axivoraX-development"
DEV = ROOT / "Development"
AX = DEV / "AxivoraX"
HOOK = DEV / "HookNYarn"
AUDIT = AX / "audit"

REPORT = AUDIT / "AXIVORAX_FULL_AUDIT_REPORT.md"
JSON_REPORT = AUDIT / "AXIVORAX_FULL_AUDIT.json"
HANDOFF = AUDIT / "AI_AGENT_AUDIT_HANDOFF.md"

def cmd(x):
    try:
        return subprocess.run(
            x, cwd=ROOT, shell=True, text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            timeout=30
        ).stdout.strip()
    except Exception as e:
        return "ERROR: " + str(e)

def all_files(p):
    if not p.exists():
        return []
    return [
        x for x in p.rglob("*")
        if x.is_file()
        and "node_modules" not in x.parts
        and ".git" not in x.parts
    ]

def src_files(p):
    exts = {
        ".ts",".tsx",".js",".jsx",".css",
        ".scss",".html",".py",".json"
    }
    return [x for x in all_files(p) if x.suffix in exts]

def line_count(p):
    n = 0
    for f in src_files(p):
        try:
            n += len(f.read_text(errors="ignore").splitlines())
        except:
            pass
    return n

def package(p):
    f = p / "package.json"

    if not f.exists():
        return {
            "exists": False,
            "scripts": {}
        }

    try:
        d = json.loads(f.read_text())
        return {
            "exists": True,
            "name": d.get("name"),
            "scripts": d.get("scripts", {}),
            "dependencies": sorted(d.get("dependencies", {}).keys()),
            "devDependencies": sorted(d.get("devDependencies", {}).keys())
        }
    except Exception as e:
        return {
            "exists": True,
            "error": str(e)
        }

def frameworks(p):
    result = []
    fs = all_files(p)
    names = {x.name for x in fs}

    if any(x.name.startswith("next.config") for x in fs):
        result.append("Next.js")

    if "next-env.d.ts" in names:
        result.append("Next.js TypeScript")

    if any("tailwind" in x.name.lower() for x in fs):
        result.append("Tailwind")

    text = ""
    for f in fs:
        if f.suffix in {".ts",".tsx",".js",".jsx",".json",".css"}:
            try:
                text += f.read_text(errors="ignore")[:30000] + "\n"
            except:
                pass

    if "supabase" in text.lower():
        result.append("Supabase")

    if "fyers" in text.lower():
        result.append("FYERS")

    if "axivorax-agent" in text.lower() or "AIChat" in names:
        result.append("AxivoraX AI Agent")

    if "TradeJournal.jsx" in names:
        result.append("Trading Journal")

    return sorted(set(result))

def secrets(p):
    findings = []

    patterns = [
        r"-----BEGIN [A-Z ]+PRIVATE KEY-----",
        r"sk-[A-Za-z0-9]{20,}",
        r"ghp_[A-Za-z0-9]{20,}",
        r"AIza[0-9A-Za-z\-_]{20,}",
        r"password\s*[:=]\s*['\"][^'\"]+['\"]",
        r"secret\s*[:=]\s*['\"][^'\"]+['\"]"
    ]

    for f in all_files(p):
        if f.suffix not in {".ts",".tsx",".js",".jsx",".py",".json"}:
            continue

        try:
            text = f.read_text(errors="ignore")
        except:
            continue

        for pattern in patterns:
            if re.search(pattern, text, re.I):
                findings.append(str(f.relative_to(ROOT)))
                break

    return sorted(set(findings))

def project(p):
    return {
        "exists": p.exists(),
        "files": len(all_files(p)),
        "source_files": len(src_files(p)),
        "source_lines": line_count(p),
        "package_json": package(p),
        "frameworks": frameworks(p),
        "possible_secret_findings": secrets(p)
    }

def compare():
    r = ROOT / "src"
    a = AX / "src"

    rf = {
        str(x.relative_to(r))
        for x in all_files(r)
    } if r.exists() else set()

    af = {
        str(x.relative_to(a))
        for x in all_files(a)
    } if a.exists() else set()

    return {
        "root_count": len(rf),
        "axivorax_count": len(af),
        "root_only": sorted(rf - af),
        "axivorax_only": sorted(af - rf)
    }

def main():
    AUDIT.mkdir(parents=True, exist_ok=True)

    now = datetime.now().astimezone().isoformat()

    data = {
        "generated_at": now,
        "repository": str(ROOT),
        "branch": cmd("git branch --show-current"),
        "remote": cmd("git remote -v"),
        "git_status": cmd("git status --short"),
        "last_commit": cmd("git log -1 --oneline"),
        "AxivoraX": project(AX),
        "HookNYarn": project(HOOK),
        "source_comparison": compare()
    }

    problems = []

    if not data["AxivoraX"]["package_json"]["exists"]:
        problems.append(
            "P1: Development/AxivoraX has no package.json."
        )

    if not data["HookNYarn"]["package_json"]["exists"]:
        problems.append(
            "P1: Development/HookNYarn has no package.json."
        )

    if data["AxivoraX"]["possible_secret_findings"]:
        problems.append(
            "P0: Possible secret/token patterns found in AxivoraX."
        )

    if data["HookNYarn"]["possible_secret_findings"]:
        problems.append(
            "P0: Possible secret/token patterns found in HookNYarn."
        )

    if (
        data["source_comparison"]["root_only"]
        or data["source_comparison"]["axivorax_only"]
    ):
        problems.append(
            "P1: Root src and Development/AxivoraX/src differ."
        )

    if data["git_status"]:
        problems.append(
            "P2: Git working tree contains changes."
        )

    data["problems"] = problems

    REPORT.write_text(
        "# AxivoraX Full Development Audit\n\n"
        f"Generated: `{now}`\n\n"
        "## Overall Status\n\n"
        "🟡 **AUTOMATED AUDIT COMPLETE — AI AGENT REVIEW REQUIRED**\n\n"
        "## AxivoraX\n\n"
        f"- Exists: `{data['AxivoraX']['exists']}`\n"
        f"- Files: `{data['AxivoraX']['files']}`\n"
        f"- Source files: `{data['AxivoraX']['source_files']}`\n"
        f"- Source lines: `{data['AxivoraX']['source_lines']}`\n"
        f"- package.json: `{data['AxivoraX']['package_json']['exists']}`\n"
        f"- Detected: `{', '.join(data['AxivoraX']['frameworks'])}`\n\n"
        "## HookNYarn\n\n"
        f"- Exists: `{data['HookNYarn']['exists']}`\n"
        f"- Files: `{data['HookNYarn']['files']}`\n"
        f"- Source files: `{data['HookNYarn']['source_files']}`\n"
        f"- Source lines: `{data['HookNYarn']['source_lines']}`\n"
        f"- package.json: `{data['HookNYarn']['package_json']['exists']}`\n"
        f"- Detected: `{', '.join(data['HookNYarn']['frameworks'])}`\n\n"
        "## Root vs AxivoraX Source\n\n"
        f"- Root src files: `{data['source_comparison']['root_count']}`\n"
        f"- Development/AxivoraX/src files: `{data['source_comparison']['axivorax_count']}`\n"
        f"- Root-only files: `{len(data['source_comparison']['root_only'])}`\n"
        f"- AxivoraX-only files: `{len(data['source_comparison']['axivorax_only'])}`\n\n"
        "## AI Agent Files\n\n"
        "- `Development/AxivoraX/src/lib/axivorax-agent.ts`\n"
        "- `Development/AxivoraX/src/components/AIChat.tsx`\n"
        "- `Development/AxivoraX/src/components/AICommandCenter.css`\n"
        "- `Development/AxivoraX/src/lib/analysisEngine.ts`\n\n"
        "## Git\n\n"
        f"- Branch: `{data['branch']}`\n"
        f"- Last commit: `{data['last_commit']}`\n\n"
        "```text\n"
        f"{data['git_status'] or '(clean)'}\n"
        "```\n\n"
        "## Automated Issues\n\n"
        + (
            "\n".join("- " + x for x in problems)
            if problems else
            "- 🟢 No major automated blockers detected."
        )
        + "\n\n"
        "## AI Agent Review Required\n\n"
        "The AxivoraX AI Agent must now review this complete audit and create:\n\n"
        "`Development/AxivoraX/audit/AI_AGENT_AUDIT_REPORT.md`\n\n"
        "The AI Agent report must include:\n\n"
        "- Overall status\n"
        "- Audit completion status\n"
        "- P0/P1/P2/P3 issues\n"
        "- Security\n"
        "- Build/typecheck/lint\n"
        "- GitHub synchronization\n"
        "- AI Agent status\n"
        "- AxivoraX status\n"
        "- HookNYarn status\n"
        "- Affected files\n"
        "- Recommended fixes\n"
        "- What must NOT be changed\n"
        "- Whether another audit is required\n\n"
        "**No application source code is modified by this audit.**\n",
        encoding="utf-8"
    )

    JSON_REPORT.write_text(
        json.dumps(data, indent=2),
        encoding="utf-8"
    )

    HANDOFF.write_text(
        "# AxivoraX AI Agent Audit Handoff\n\n"
        "You are the AxivoraX AI Agent responsible for the engineering review.\n\n"
        "Read completely:\n\n"
        "- `AXIVORAX_FULL_AUDIT_REPORT.md`\n"
        "- `AXIVORAX_FULL_AUDIT.json`\n\n"
        "Review:\n\n"
        "- Development/AxivoraX\n"
        "- Development/HookNYarn\n"
        "- GitHub development synchronization\n"
        "- AI Agent implementation\n"
        "- Security\n"
        "- Build/typecheck/lint configuration\n"
        "- Duplicate source trees\n"
        "- Backup structures\n"
        "- Root src versus Development/AxivoraX/src\n\n"
        "Do NOT modify application code.\n"
        "Do NOT push.\n"
        "Do NOT delete backups.\n"
        "Do NOT expose secrets.\n\n"
        "Create:\n\n"
        "`AI_AGENT_AUDIT_REPORT.md`\n\n"
        "Your report must contain P0/P1/P2/P3 issues, confirmed problems "
        "versus warnings, affected files, recommended fixes, and whether "
        "another audit is required.\n\n"
        "End with:\n\n"
        "`AUDIT STATUS: COMPLETE / INCOMPLETE`\n\n"
        "`NEXT AUDIT REQUIRED: YES / NO`\n",
        encoding="utf-8"
    )

    print()
    print("=" * 70)
    print("AXIVORAX FULL AUDIT CREATED SUCCESSFULLY")
    print("=" * 70)
    print()
    print("REPORT:")
    print(REPORT)
    print()
    print("JSON:")
    print(JSON_REPORT)
    print()
    print("AI AGENT HANDOFF:")
    print(HANDOFF)
    print()
    print("AI AGENT REPORT TARGET:")
    print(AUDIT / "AI_AGENT_AUDIT_REPORT.md")
    print()
    print("Branch:", data["branch"])
    print("Automated issues:", len(problems))
    print()
    print("DO NOT PUSH YET.")
    print()

if __name__ == "__main__":
    main()
