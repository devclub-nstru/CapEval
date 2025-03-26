# CapEval

## 🚀 Overview

In college, submitting and evaluating assignments or projects can be cumbersome for both students and faculty. Moreover, addressing student queries often requires synchronous communication, which is not always feasible. **CapEval** streamlines the assignment lifecycle — from creation and submission to evaluation — while offering an intuitive interface for query resolution. This platform reduces real-time interaction, enabling both parties to engage at their convenience.

---

## 🎯 Goals

### Primary Goal

To develop a streamlined digital platform that optimizes the assignment lifecycle and enhances communication between students and faculty.

### Objectives

- **Assignment Management**

  - Enable easy creation and distribution of assignments/projects.
  - Allow structured submission with deadlines and version control.

- **Evaluation & Feedback**

  - Provide an intuitive interface for mentors to review and grade assignments.
  - Enable detailed feedback and automate grading where applicable.

- **Query Resolution**

  - Implement a structured system for students to ask doubts.
  - Allow faculty to respond at their convenience, reducing dependency on synchronous interaction.

- **Time Efficiency & Flexibility**

  - Minimize real-time interactions while ensuring smooth academic communication.
  - Allow both students and faculty to engage with the platform at their preferred time.

- **Enhanced Tracking & Transparency**
  - Provide students with real-time updates on their assignment status.
  - Offer faculty insights into pending evaluations and student progress.

---

## 📈 Success Metrics

### User Adoption & Engagement

- **Student Adoption Rate:** Percentage of students actively using the platform for assignment submissions.
- **Faculty Adoption Rate:** Percentage of faculty using the platform for assignment creation and evaluation.
- **Daily/Weekly Active Users (DAU/WAU):** Number of users engaging with the platform regularly.

### Assignment Workflow Efficiency

- **Reduction in Submission Delays:** Percentage decrease in late submissions.
- **Average Assignment Review Time:** Time taken by faculty to evaluate assignments before and after platform implementation.
- **Query Resolution Time:** Average time taken to address student queries.

### Communication & Accessibility

- **Decrease in In-Person Queries:** Percentage reduction in direct faculty-student interaction.
- **Response Time of Faculty:** Average time taken by mentors to answer student queries.

### System Performance & Reliability

- **Uptime:** Ensuring 99% platform availability.
- **Load Time:** Optimal page load times under 2 seconds.

### Academic Impact

- **Improvement in Assignment Scores:** Percentage increase in student scores.
- **Student Satisfaction Score:** Feedback on ease of use and effectiveness.
- **Faculty Satisfaction Score:** Feedback from faculty on time savings and improved evaluation.

---

## 🔗 Assumptions and Dependencies

### Assumptions

- Users (students & faculty) will actively engage with the platform.
- Faculty will transition from manual to digital grading.
- Students will prefer online query resolution over in-person interaction.
- Stable internet access will be available.
- Institutions will support platform adoption.
- User training will be minimal due to an intuitive interface.
- Data privacy and security compliance will be ensured.

### Dependencies

- **Institutional Adoption:** Universities must integrate the platform into their academic workflow.
- **LMS Integration:** Seamless integration with existing LMS platforms like Moodle, Blackboard, and Google Classroom.
- **Faculty & Student Willingness:** Platform success depends on user adoption.
- **Technical Infrastructure:** Hosting, database management, and security protocols.
- **Support & Maintenance:** Ongoing updates, bug fixes, and support.
- **Compliance:** Adherence to educational regulations and data protection laws.
- **Third-Party Tools & APIs:** AI-based grading, plagiarism detection, and cloud storage.
- **Budget & Funding:** Resources to ensure development, deployment, and maintenance.

---

## 📚 Requirements

### User Roles

- **Student Login:** For normal users submitting assignments.
- **Mentor Login:** For reviewing and grading assignments.
- **Super Admin:** CRUD access for user and mentor management.

---

### Feature Requirements

| #   | Title              | Acceptance Criteria                                                                      | Priority | Notes                                   |
| --- | ------------------ | ---------------------------------------------------------------------------------------- | -------- | --------------------------------------- |
| 1   | Login Modal        | Guest login option; restricted assignment view without login; submission requires login. | High     | User, Mentor, and Super Admin levels.   |
| 2   | Home Page          | Lists of ongoing, submitted, pending, and missed assignments.                            | High     | User-specific home page.                |
| 3   | Submission Modal   | Pre-filled user details, with mentor name selection required.                            | High     | Simple, intuitive UI.                   |
| 4   | Leaderboard        | Subject-wise rankings with an opt-out option by mentors.                                 | Medium   | Leaderboard visibility is configurable. |
| 5   | Query Button       | Modal for query submission with textarea and file attachment.                            | High     | Queries stored and listed for review.   |
| 6   | Query Section      | Displays all queries with mentor responses.                                              | High     | Organized query listing.                |
| 7   | Mentor Admin Panel | Create, manage, and evaluate assignments.                                                | High     | Dashboard with query and student views. |

---

## 🎨 UX Mocks

> _To be added in the subsequent development phase._

---

## ❓ FAQs

| Question                                           | Outcome                                                           |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| Can a student submit without login?                | No, submissions require login for tracking and assignment status. |
| Will faculty see assignment submissions instantly? | Yes, all submissions are updated in real-time.                    |
| Can mentors opt-out of the leaderboard feature?    | Yes, mentors can exclude assignments from leaderboard rankings.   |
| How are student queries tracked?                   | All queries are listed in the query section for mentor review.    |

---

## 🚫 Out of Scope

- **Integration with Multiple LMS Platforms:** Future versions will consider LMS integration.
- **AI-Based Grading & Plagiarism Detection:** Not included in the initial phase.
- **Offline Functionality:** The platform will require internet connectivity.
- **Scalability Beyond Initial User Base:** Initial support is for limited institutions before scaling.
