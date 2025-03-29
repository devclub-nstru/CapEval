# Product Requirements Document (PRD)

## Project Name: CapEval

**Version:** 1.0

## Introduction

CapEval is a digital platform designed to streamline the assignment lifecycle in academic institutions. It simplifies assignment creation, submission, evaluation, and query resolution, reducing real-time dependencies and enhancing efficiency for both students and faculty. By offering an intuitive interface and structured workflow, CapEval ensures seamless academic engagement with minimal disruption.

## Objectives

### 1. Assignment Management
- Enable easy creation and distribution of assignments and projects.
- Allow structured submission with defined deadlines.

### 2. Evaluation & Feedback
- Provide an intuitive interface for faculty to review and grade assignments.
- Support detailed feedback and automated grading where applicable.

### 3. Query Resolution
- Implement a structured system for students to submit queries.
- Allow faculty to respond asynchronously, reducing reliance on real-time interactions.

### 4. Time Efficiency & Flexibility
- Minimize the need for real-time faculty-student interactions while ensuring smooth academic communication.
- Enable students and faculty to engage with the platform at their convenience.

### 5. Enhanced Tracking & Transparency
- Provide students with real-time updates on assignment status.
- Offer faculty insights into pending evaluations and student progress.

## Success Metrics

### User Adoption & Engagement
- **Student Adoption Rate:** Percentage of students using the platform for assignment submissions.
- **Faculty Adoption Rate:** Percentage of faculty using the platform for assignment creation and evaluation.
- **Daily/Weekly Active Users (DAU/WAU):** Number of users actively engaging with the platform.

### Assignment Workflow Efficiency
- **Reduction in Submission Delays:** Percentage decrease in late submissions.
- **Average Assignment Review Time:** Time taken by faculty to evaluate assignments before and after platform implementation.
- **Query Resolution Time:** Average time taken to address student queries.

### Communication & Accessibility
- **Decrease in In-Person Queries:** Reduction in direct faculty-student interactions.
- **Response Time of Faculty:** Average time taken to answer student queries.

### System Performance & Reliability
- **Uptime:** Ensure 99% platform availability.
- **Load Time:** Optimal page load times under 2 seconds.

### Academic Impact
- **Improvement in Assignment Scores:** Percentage increase in student scores post-implementation.
- **Student Satisfaction Score:** Feedback on ease of use and effectiveness.
- **Faculty Satisfaction Score:** Feedback on time savings and improved evaluation process.

## Assumptions and Dependencies

### Assumptions
- Students and faculty will actively engage with the platform.
- Faculty will transition from manual grading to digital evaluation.
- Students will prefer online query resolution over in-person interaction.
- Stable internet access will be available for users.
- Institutions will support and promote platform adoption.
- Minimal user training will be required due to an intuitive interface.
- Data privacy and security compliance will be ensured.

### Dependencies
- **Institutional Adoption:** Universities must integrate the platform into their academic workflow.
- **LMS Integration:** Compatibility with Moodle, Blackboard, and Google Classroom.
- **User Willingness:** Platform success depends on adoption by faculty and students.
- **Technical Infrastructure:** Reliable hosting, database management, and security protocols.
- **Support & Maintenance:** Ongoing updates, bug fixes, and technical support.
- **Compliance:** Adherence to educational regulations and data protection laws.
- **Third-Party Tools & APIs:** Integration with AI-based grading, plagiarism detection, and cloud storage.
- **Budget & Funding:** Resources for development, deployment, and maintenance.

## Requirements

### User Roles
- **Student Login:** Submit assignments and track status.
- **Mentor Login:** Review, grade assignments, and answer queries.
- **Super Admin:** CRUD access for user and mentor management.

### Feature Requirements

| #  | Title                 | Acceptance Criteria                                                       | Priority | Notes |
|----|-----------------------|---------------------------------------------------------------------------|----------|-------|
| 1  | Login System          | Guest login with restricted access; full functionality requires authentication. | High     | User, Mentor, and Super Admin levels. |
| 2  | Dashboard             | Lists of ongoing, submitted, pending, and missed assignments.             | High     | Personalized user dashboard. |
| 3  | Assignment Submission | Pre-filled user details; mentor selection required.                      | High     | Simple, intuitive UI. |
| 4  | Leaderboard           | Subject-wise rankings with an opt-out option for students and mentors.    | Medium   | Configurable visibility settings. |
| 5  | Query Submission      | Modal for query submission with text input and file attachment.           | High     | Queries stored and listed for review. |
| 6  | Query Management      | Displays all queries with mentor responses.                               | High     | Structured listing for easy access. |
| 7  | Mentor Panel          | Dashboard to manage and evaluate assignments.                            | High     | Includes query and student insights. |

## FAQs

| Question | Answer |
|----------|--------|
| Can a student submit without login? | No, login is required for tracking and status updates. |
| Will faculty see assignment submissions instantly? | Yes, all submissions update in real-time. |
| How are student queries tracked? | Queries are stored in a structured section for mentor review. |

## Out of Scope
- **LMS Integration:** Future versions will support integration with multiple LMS platforms.
- **AI-Based Grading & Plagiarism Detection:** Not included in the initial phase.
- **Offline Functionality:** Internet connectivity is required.
- **Enterprise-Level Scalability:** Initial support is limited to selected institutions.

## Future Considerations
- **Cloud Storage:** Enable persistent storage for assignments and evaluations.
- **Advanced AI Features:** AI-based grading and plagiarism detection.
- **Enterprise Features:** Team workspaces, user roles, and private project management.
