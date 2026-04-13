def check_emergency(symptoms: str) -> bool:
    emergency_keywords = [
        "chest pain",
        "shortness of breath",
        "breathing difficulty",
        "unconscious",
        "seizure",
        "severe bleeding",
        "heart attack",
        "stroke",
        "loss of vision",
        "confusion"
    ]

    symptoms = symptoms.lower()

    for keyword in emergency_keywords:
        if keyword in symptoms:
            return True

    return False


def format_response(response: str) -> dict:
    conditions = []
    steps = []
    urgency = ""

    section = None

    for line in response.split("\n"):
        line = line.strip()

        if "Possible Conditions" in line:
            section = "conditions"
            continue
        elif "Urgency Level" in line:
            section = "urgency"
            continue
        elif "Suggested Next Steps" in line:
            section = "steps"
            continue

        if section == "conditions" and line.startswith("-"):
            conditions.append(line.replace("-", "").strip())

        elif section == "steps" and line.startswith("-"):
            steps.append(line.replace("-", "").strip())

        elif section == "urgency" and line:
            urgency = line.strip()

    return {
        "conditions": conditions,
        "urgency": urgency,
        "steps": steps
    }
