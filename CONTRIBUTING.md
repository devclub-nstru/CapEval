# CapEval Contributing Guidelines

## About CapEval
CapEval is an open-source platform designed to streamline assignment evaluation and feedback processes. Contributors play a key role in improving its functionality and ensuring a seamless experience for students and faculty.

## 📝 Issue Proposal Guidelines
⚠️ **Important:**  
All issue proposals must be submitted through the **DCODE Panel**.  
🔗 **[Submit Proposal Here](https://dcode.codes/proposal)**  

This ensures that all ideas and improvements are tracked and evaluated efficiently.  

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Admin Panel:** Next.js

## Contribution Workflow

### Issue & Task Management with D-Coins
CapEval uses **D-Coins**, a virtual event currency system in DCODE. Contributors can use D-Coins to “claim” issues and earn more by successfully contributing to the project.

- Contributors must use D-Coins to “buy” an issue before starting work.
- Issues are first come, first serve.
- More issues may be added based on community feedback.
- If you discover a bug or improvement, petition to add it to the issue list.

### Getting Started
1. **Fork & Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/capeval.git
   ```
2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature-name
   ```
3. **Implement Changes & Commit:**
   ```bash
   git commit -m "Fix: [Short Description of Fix]"
   ```
4. **Push & Submit a Pull Request (PR):**
   ```bash
   git push origin feature-name
   ```
   - Clearly describe the changes in your PR.
   - Reference the issue number.
   - Request a review from a maintainer.

## Code Quality & Standards

### JavaScript & React Best Practices
- Follow clean code principles.
- Use functional components and hooks.
- Implement proper prop validation.
- Optimize performance using useCallback.

### Node.js & Express Best Practices
- Follow RESTful API design principles.
- Implement middleware for authentication & security.
- Use environment variables for sensitive data.
- Optimize database queries for performance.

### Performance & Security Considerations
- Minimize re-renders using React optimizations.
- Implement rate limiting for API requests.
- Use caching for frequently accessed data.
- Conduct regular security audits.
- Enforce HTTPS and validate user input.

Middleware will enforce role-based restrictions on API routes.

## Code Review Checklist

### General
- Code follows style guidelines.
- Proper error handling is implemented.
- No unnecessary comments or unused code.

### Performance
- Efficient state management.
- Optimized WebSocket handling.
- No redundant API calls.

### Security
- No hardcoded credentials.
- Proper authentication and input validation.
- Adherence to security best practices.

## Documentation Standards
- Keep `README.md` updated.
- Document complex components and APIs.
- Maintain a clear `CHANGELOG.md`.

## Community & Collaboration Guidelines
CapEval encourages open-source collaboration in a respectful and productive environment.

### Guidelines
- No issue hoarding—work on one issue at a time.
- Respect others' contributions.
- Provide constructive PR reviews.
- Encourage and help newcomers.
- Follow ethical coding practices.

### Imposter Syndrome Disclaimer
We welcome all contributions, whether it’s code, documentation, or feedback. If you’re hesitant to contribute, remember that everyone starts somewhere. Feel free to ask questions, and we’ll help you along the way.

### Need Help?
If you have any questions, reach out to the maintainers or ask in our community discussion forums.

Happy Coding! 🚀
