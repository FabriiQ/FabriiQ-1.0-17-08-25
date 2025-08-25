# FabriiQ — Product Features Specification
## The Integrated Multi-Campus Student Information & Learning Experience Platform

### Platform Overview
FabriiQ delivers a comprehensive educational ecosystem that seamlessly integrates a robust Multi-Campus Student Information System (SIS) with an advanced Learning Experience Platform (LXP). Built on modern architecture principles, it transforms traditional education through intelligent automation, personalized learning experiences, and data-driven insights across all institutional operations.

### Core Architecture Principles
- **Multi-Campus Integration**: Centralized control with campus-specific customization
- **Real-Time Synchronization**: Instant updates across all locations with offline support
- **Mobile-First Design**: Touch-optimized interfaces with progressive web app capabilities
- **Enterprise Security**: Role-based access control with comprehensive audit trails
- **Scalable Infrastructure**: Built to grow with institutional expansion and evolving needs

### 1) Comprehensive Curriculum Management with Bloom's Analytics

**Advanced Curriculum Architecture**
- **Structured Subject Framework**: Hierarchical organization from subjects to specific learning outcomes
- **Learning Outcomes Framework**: ABCD and SMART framework integration with intelligent action verb suggestions
- **Comprehensive Rubric System**: Criteria with weightings, descriptors, and reusable templates
- **Content Mapping**: Direct linkage between activities, assessments, outcomes, and rubrics
- **Version Control**: Draft → Review → Publish workflow with comprehensive change logging

**Revolutionary Bloom's Taxonomy Integration**
- **Real-Time Cognitive Distribution Analysis**: Live tracking of learning complexity across all activities
- **Advanced Mastery Tracking**: Individual and cohort progress through all six cognitive levels
- **Curriculum Optimization Tools**: Data-driven recommendations for cognitive balance improvement
- **Assessment Rubric Analytics**: Performance analysis and grading consistency measurement
- **Sophisticated Reporting System**: Comprehensive insights into educational effectiveness

### 2) Streamlined Enrollment & Student Management System

**Multi-Modal Enrollment Workflows**
- **Self-Serve Application Portal**: Online applications with document upload and validation
- **Admin-Assisted Enrollment**: Back-office tools for complex enrollment scenarios
- **Bulk Import Capabilities**: Mass enrollment processing with data validation and error handling
- **Automated Capacity Management**: Real-time availability tracking with waitlist processing
- **Integrated Prerequisite Checking**: Automatic validation of course requirements and eligibility

**Comprehensive Student Lifecycle Management**
- **Complete Student Profiles**: Demographics, guardians, academic history, and document management
- **Cross-Campus Transfer Management**: Streamlined processes with automatic credit transfer
- **Class-Based Workflow**: Integrated attendance and academic management (replacing standalone student tabs)
- **Document Management**: Supabase storage integration with secure sharing and archiving
- **Academic Progress Tracking**: Real-time grade calculation and transcript management

### 3) Intelligent Fee Management & Financial Operations

**Advanced Fee Architecture**
- **Program-Based Fee Structures**: Automatic enrollment-based fee assignment with flexible components
- **Multi-Component Support**: Tuition, admission, laboratory, library, and specialized program fees
- **Dynamic Calculation Engine**: Automated processing with institutional discounts and scholarships
- **Multi-Currency Support**: PKR, USD, AED, SAR with custom symbol configuration
- **Seamless Academic Integration**: Automatic alignment with terms and academic cycles

**Comprehensive Financial Management**
- **Unified Configuration Page**: Centralized late fee policy management (/admin/system/fee-management/unified)
- **Automated Late Fee Policies**: Grace periods, escalation rules, and manual override capabilities
- **Real-Time Payment Processing**: Instant confirmation with automated status updates
- **Advanced Arrears Management**: Aging analysis with proactive collection workflows
- **Comprehensive Reporting**: Collections, aging, revenue analysis by campus and program

### 4) Attendance Management
- Class-based workflow: on class selection, show bulk and per-student options
- Offline-first capture for teachers with sync on reconnect
- Analytics: attendance trends, anomalies, per-student heatmaps

### 5) Activities & Assessments
- Activities: assignments, projects, quizzes, observations
- Assessments: rubric-based, auto-calculated scores by criteria
- Feedback: qualitative comments, evidence files (Supabase)
- Rewards: badges/points integrated into class leaderboard

### 6) Reports & Analytics
- Real-time dashboards: class, cohort, campus
- Bloom analytics: outcome coverage, mastery by Bloom level
- Finance: fee collection, dues, discounts impact
- Attendance: compliance, punctuality, absence reasons
- Exports: CSV/PDF; schedule email reports; role-based access

### 7) Multi-Campus Management
- Campus hierarchy; program/class structures per campus
- Data partitioning and archiving for large invoice volumes
- Cross-campus rollups for academics, attendance, finance
- Role-based access with campus scoping

### 8) Learning Experience Platform (LXP)
- Content: lessons, resources, playlists mapped to outcomes
- Learning path: personalized recommendations
- Time-on-task tracking; learning time investment analytics
- Social learning: posts, comments; moderation hooks

### 9) Teacher Portal & Classroom Tools
- Class overview: roster, schedule, upcoming activities, quick insights
- Tools: attendance, activities, assessments, rewards, announcements
- Class reports: progress, mastery, Bloom analytics; export/share
- Leaderboard: configurable rules; celebrate achievements
- Classroom UX: upload dialogs (not separate pages) for files (Supabase)

### 10) Student & Parent Portal
- Student: achievements, goals, time investment, progress by outcomes
- Offline support: work and view content offline; background sync
- Psychology-informed nudges: streaks, goals, reminders (ethical design)
- Social media wall: class/community posts with safe moderation
- Parent view: attendance, grades, fees, notifications

### 11) Security, Permissions, and Compliance
- Role-based access (student, parent, teacher, admin, finance)
- Audit logs; consent tracking for guardians
- Data residency awareness; privacy controls

### 12) Integrations & Platform
- Supabase: auth, RLS policies, storage for documents/media
- Notifications: email/SMS/in-app; actual notifications, not mock
- Localization: currencies and RTL readiness
- API: webhooks for enrollment/fees events

### Non-Functional Notes
- Performance: real-time charts and visualizations; offline caching
- Reliability: retries, conflict resolution on sync
- Accessibility: WCAG compliant

