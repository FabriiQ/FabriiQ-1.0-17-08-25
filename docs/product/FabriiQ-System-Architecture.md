# FabriiQ System Architecture Documentation
## Complete Technical Architecture & Implementation Guide

### Version: Alpha 1.0
### Date: August 2025
### Document Type: Technical Architecture Documentation

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Database Architecture](#database-architecture)
4. [API Architecture](#api-architecture)
5. [Component Architecture](#component-architecture)
6. [Security Architecture](#security-architecture)
7. [Performance & Scalability](#performance--scalability)
8. [Integration Patterns](#integration-patterns)

---

## System Overview

FabriiQ is built as a modern, scalable, multi-tenant educational platform using a microservices-inspired architecture with a monolithic deployment strategy. The system is designed to handle multiple institutions, each with multiple campuses, supporting thousands of concurrent users.

### Architectural Principles

- **Multi-Tenant Architecture**: Single codebase serving multiple institutions with data isolation
- **Type-Safe Development**: End-to-end TypeScript with compile-time error detection
- **Real-Time Capabilities**: WebSocket integration for live features
- **Scalable Design**: Horizontal scaling support with database partitioning
- **Security-First**: Built-in authentication, authorization, and data protection
- **Mobile-First**: Responsive design optimized for all device types

### System Boundaries

```
┌─────────────────────────────────────────────────────────────┐
│                    FabriiQ Platform                        │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Next.js)  │  Backend (Node.js)  │  Database     │
│  - Student Portal    │  - tRPC APIs        │  - PostgreSQL │
│  - Teacher Portal    │  - Business Logic   │  - Prisma ORM │
│  - Admin Portals     │  - AI Integration   │  - Supabase   │
│  - Mobile Views      │  - Real-time        │  - File Store │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0+
- **UI Library**: React 18 with Server Components
- **Styling**: Tailwind CSS with custom design system
- **Component Library**: shadcn/ui with Radix UI primitives
- **State Management**: React Context + tRPC for server state
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for analytics visualization

### Backend Technologies
- **Runtime**: Node.js 18+
- **Framework**: Next.js API Routes
- **API Layer**: tRPC for type-safe APIs
- **Database ORM**: Prisma with PostgreSQL
- **Authentication**: NextAuth.js with JWT
- **File Storage**: Supabase Storage
- **Real-time**: Socket.io for live features
- **AI Integration**: Multiple providers (OpenAI, Anthropic, Google)

### Database & Storage
- **Primary Database**: PostgreSQL 15+
- **ORM**: Prisma with advanced features
- **File Storage**: Supabase with CDN
- **Caching**: Redis for session and query caching
- **Search**: PostgreSQL Full-Text Search
- **Backup**: Automated daily backups with point-in-time recovery

### DevOps & Infrastructure
- **Deployment**: Vercel for frontend, Railway for backend
- **Monitoring**: Built-in analytics and error tracking
- **CI/CD**: GitHub Actions with automated testing
- **Environment Management**: Multiple staging environments
- **Performance**: Lighthouse CI for performance monitoring

---

## Database Architecture

### Core Entity Relationships

```mermaid
erDiagram
    Institution ||--o{ Campus : has
    Institution ||--o{ Program : offers
    Institution ||--o{ User : contains
    
    Campus ||--o{ Class : hosts
    Campus ||--o{ UserCampusAccess : grants
    
    Program ||--o{ Course : includes
    Course ||--o{ Subject : contains
    
    User ||--o| StudentProfile : has
    User ||--o| TeacherProfile : has
    User ||--o{ UserPermission : has
    
    Class ||--o{ StudentEnrollment : contains
    Class ||--o{ Activity : hosts
    Class ||--o{ Assessment : conducts
    
    StudentProfile ||--o{ StudentPoints : earns
    StudentProfile ||--o{ StudentAchievement : unlocks
    StudentProfile ||--o{ LearningTimeRecord : tracks
```

### Key Database Models

#### 1. Institution & Campus Models
```typescript
// Institution - Top-level organization
model Institution {
  id: string (Primary Key)
  code: string (Unique)
  name: string
  status: SystemStatus
  metadata: Json
  campuses: Campus[]
  programs: Program[]
  users: User[]
}

// Campus - Physical/Virtual campus locations
model Campus {
  id: string (Primary Key)
  code: string (Unique)
  name: string
  institutionId: string (Foreign Key)
  address: Json
  contact: Json
  classes: Class[]
  userAccess: UserCampusAccess[]
}
```

#### 2. User & Profile Models
```typescript
// User - Core user entity
model User {
  id: string (Primary Key)
  username: string (Unique)
  email: string (Unique)
  userType: UserType (STUDENT, TEACHER, ADMIN, etc.)
  institutionId: string (Foreign Key)
  primaryCampusId: string
  studentProfile: StudentProfile?
  teacherProfile: TeacherProfile?
  permissions: UserPermission[]
}

// StudentProfile - Extended student information
model StudentProfile {
  id: string (Primary Key)
  userId: string (Unique Foreign Key)
  enrollmentNumber: string (Unique)
  currentGrade: string
  academicHistory: Json
  interests: string[]
  achievements: Json[]
  totalPoints: int (Default: 0)
  currentLevel: int (Default: 1)
}
```

#### 3. Academic Structure Models
```typescript
// Program - Academic programs (e.g., MYP, IGCSE)
model Program {
  id: string (Primary Key)
  code: string (Unique)
  name: string
  type: string
  level: int
  duration: int
  courses: Course[]
}

// Course - Subject courses within programs
model Course {
  id: string (Primary Key)
  code: string (Unique)
  name: string
  programId: string (Foreign Key)
  subjects: Subject[]
}

// Class - Actual class instances
model Class {
  id: string (Primary Key)
  code: string (Unique)
  name: string
  courseCampusId: string (Foreign Key)
  termId: string (Foreign Key)
  maxCapacity: int
  currentCount: int
  students: StudentEnrollment[]
  activities: Activity[]
}
```

### Data Partitioning Strategy

#### 1. Institution-Level Partitioning
- All data is partitioned by `institutionId`
- Ensures complete data isolation between institutions
- Optimized queries with institution-based indexes

#### 2. Campus-Level Partitioning
- Secondary partitioning by `campusId` for large institutions
- Enables campus-specific data access patterns
- Supports campus-level reporting and analytics

#### 3. Time-Based Partitioning
- Learning time records partitioned by month/year
- Analytics data partitioned by academic periods
- Efficient historical data management

### Database Indexes & Performance

#### Critical Indexes
```sql
-- User lookup indexes
CREATE INDEX idx_users_institution_username ON users(institutionId, username);
CREATE INDEX idx_users_institution_email ON users(institutionId, email);

-- Class and enrollment indexes
CREATE INDEX idx_classes_campus_term ON classes(campusId, termId);
CREATE INDEX idx_enrollments_class_status ON student_enrollments(classId, status);

-- Activity and grading indexes
CREATE INDEX idx_activities_class_type ON activities(classId, activityType);
CREATE INDEX idx_grades_student_activity ON activity_grades(studentId, activityId);

-- Analytics and reporting indexes
CREATE INDEX idx_points_student_date ON student_points(studentId, createdAt);
CREATE INDEX idx_time_records_partition ON learning_time_records(partitionKey, studentId);
```

---

## API Architecture

### tRPC Router Structure

FabriiQ uses tRPC for type-safe API development with the following router hierarchy:

```typescript
// Root Router Structure
export const appRouter = createTRPCRouter({
  // Authentication & User Management
  auth: authRouter,
  user: userRouter,
  
  // Academic Management
  institution: institutionRouter,
  campus: campusRouter,
  program: programRouter,
  class: classRouter,
  
  // Student Management
  student: studentRouter,
  enrollment: enrollmentRouter,
  
  // Teacher Management
  teacher: teacherRouter,
  teacherAssignment: teacherAssignmentRouter,
  
  // Academic Content
  activity: activityRouter,
  assessment: assessmentRouter,
  questionBank: questionBankRouter,
  
  // Analytics & Reporting
  analytics: analyticsRouter,
  teacherAnalytics: teacherAnalyticsRouter,
  studentAnalytics: studentAnalyticsRouter,
  
  // Gamification
  rewards: rewardsRouter,
  leaderboard: leaderboardRouter,
  
  // Communication
  messaging: messagingRouter,
  socialWall: socialWallRouter,
  
  // AI Integration
  aiStudio: aiStudioRouter,
  studentAssistant: studentAssistantRouter,
  
  // Fee Management
  feeManagement: feeManagementRouter,
  invoice: invoiceRouter,
  
  // Learning Time Tracking
  learningTime: learningTimeRouter,
});
```

### API Security & Middleware

#### 1. Authentication Middleware
```typescript
// Protected procedure with authentication
export const protectedProcedure = publicProcedure.use(
  async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  }
);
```

#### 2. Role-Based Authorization
```typescript
// Role-based access control
export const adminProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const userType = ctx.session.user.userType;
    if (!['SYSTEM_ADMIN', 'CAMPUS_ADMIN'].includes(userType)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return next();
  }
);
```

#### 3. Institution Isolation
```typescript
// Ensure data isolation by institution
export const institutionProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    const institutionId = ctx.session.user.institutionId;
    return next({
      ctx: {
        ...ctx,
        institutionId,
      },
    });
  }
);
```

### API Response Patterns

#### 1. Standardized Response Format
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: PaginationMeta;
    filters?: FilterMeta;
    timestamp: string;
  };
}
```

#### 2. Pagination Support
```typescript
interface PaginationInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

---

## Component Architecture

### Frontend Component Hierarchy

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (student)/         # Student portal routes
│   ├── (teacher)/         # Teacher portal routes
│   ├── (admin)/           # Admin portal routes
│   └── api/               # API routes
│
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── forms/            # Form components
│   ├── charts/           # Chart components
│   ├── student/          # Student-specific components
│   ├── teacher/          # Teacher-specific components
│   └── admin/            # Admin-specific components
│
├── features/             # Feature-based modules
│   ├── activities/       # Activity management
│   ├── assessments/      # Assessment system
│   ├── rewards/          # Gamification system
│   ├── analytics/        # Analytics dashboard
│   ├── messaging/        # Communication system
│   └── ai-studio/        # AI content generation
│
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── providers/            # React context providers
├── server/               # Backend logic
│   ├── api/             # tRPC routers
│   ├── db/              # Database utilities
│   └── services/        # Business logic services
│
└── types/                # TypeScript type definitions
```

### Component Design Patterns

#### 1. Compound Components
```typescript
// Example: Activity Creator compound component
export const ActivityCreator = {
  Root: ActivityCreatorRoot,
  Header: ActivityCreatorHeader,
  Content: ActivityCreatorContent,
  Sidebar: ActivityCreatorSidebar,
  Footer: ActivityCreatorFooter,
};

// Usage
<ActivityCreator.Root>
  <ActivityCreator.Header />
  <ActivityCreator.Content />
  <ActivityCreator.Sidebar />
  <ActivityCreator.Footer />
</ActivityCreator.Root>
```

#### 2. Higher-Order Components
```typescript
// Time tracking HOC
export function withTimeTracking<T extends object>(
  Component: React.ComponentType<T>
) {
  return function TrackedComponent(props: T & { activityId: string }) {
    const { startTracking, stopTracking } = useTimeTracking();
    
    useEffect(() => {
      startTracking(props.activityId);
      return () => stopTracking(props.activityId);
    }, [props.activityId]);
    
    return <Component {...props} />;
  };
}
```

#### 3. Custom Hooks Pattern
```typescript
// Custom hook for student analytics
export function useStudentAnalytics(studentId: string) {
  const { data, isLoading, error } = api.studentAnalytics.getOverview.useQuery({
    studentId,
  });
  
  const analytics = useMemo(() => {
    if (!data) return null;
    return {
      performance: calculatePerformance(data),
      trends: analyzeTrends(data),
      recommendations: generateRecommendations(data),
    };
  }, [data]);
  
  return { analytics, isLoading, error };
}
```

---

## Security Architecture

### Authentication & Authorization

#### 1. Multi-Layer Authentication
- **Session-based**: NextAuth.js with JWT tokens
- **Role-based**: Hierarchical permission system
- **Institution-based**: Data isolation by institution
- **Campus-based**: Granular access control

#### 2. Permission System
```typescript
enum UserType {
  SYSTEM_ADMIN = "SYSTEM_ADMIN",
  CAMPUS_ADMIN = "CAMPUS_ADMIN", 
  COORDINATOR = "COORDINATOR",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT"
}

interface UserPermission {
  userId: string;
  resource: string;
  action: string;
  campusId?: string;
  classId?: string;
}
```

### Data Protection

#### 1. Encryption
- **At Rest**: Database encryption for sensitive fields
- **In Transit**: HTTPS/TLS for all communications
- **Application Level**: Sensitive data encryption in JSON fields

#### 2. Privacy Compliance
- **FERPA Compliance**: Educational record protection
- **GDPR Ready**: Data portability and deletion rights
- **Audit Logging**: Comprehensive access tracking

### Input Validation & Sanitization

#### 1. Schema Validation
```typescript
// Zod schemas for input validation
export const createStudentSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phoneNumber: z.string().regex(/^\+?[\d\s-()]+$/),
  dateOfBirth: z.date().max(new Date()),
});
```

#### 2. SQL Injection Prevention
- **Prisma ORM**: Parameterized queries by default
- **Input Sanitization**: All user inputs validated and sanitized
- **Prepared Statements**: No raw SQL execution with user input

---

## Performance & Scalability

### Database Optimization

#### 1. Query Optimization
- **Selective Loading**: Only fetch required fields
- **Batch Operations**: Bulk inserts and updates
- **Connection Pooling**: Efficient database connections
- **Query Caching**: Redis-based query result caching

#### 2. Indexing Strategy
- **Composite Indexes**: Multi-column indexes for complex queries
- **Partial Indexes**: Conditional indexes for filtered queries
- **Full-Text Search**: PostgreSQL native search capabilities

### Frontend Performance

#### 1. Code Splitting
- **Route-based**: Automatic code splitting by Next.js
- **Component-based**: Dynamic imports for heavy components
- **Feature-based**: Lazy loading of feature modules

#### 2. Caching Strategy
- **Static Generation**: Pre-built pages where possible
- **Incremental Static Regeneration**: Dynamic content with caching
- **Client-side Caching**: tRPC query caching with React Query

### Scalability Patterns

#### 1. Horizontal Scaling
- **Database Sharding**: Institution-based data partitioning
- **Load Balancing**: Multiple application instances
- **CDN Integration**: Global content delivery

#### 2. Vertical Scaling
- **Resource Optimization**: Efficient memory and CPU usage
- **Database Tuning**: Optimized PostgreSQL configuration
- **Monitoring**: Real-time performance tracking

---

## Integration Patterns

### AI Service Integration

#### 1. Multi-Provider Support
```typescript
interface AIProvider {
  name: string;
  generateContent(prompt: string, options: AIOptions): Promise<string>;
  analyzeContent(content: string): Promise<AnalysisResult>;
}

class AIOrchestrator {
  private providers: Map<string, AIProvider> = new Map();
  
  async routeRequest(request: AIRequest): Promise<AIResponse> {
    const provider = this.selectProvider(request);
    return provider.generateContent(request.prompt, request.options);
  }
}
```

#### 2. AIVY Agent System
- **Master Orchestrator**: Central coordination of all agents
- **Specialized Agents**: Domain-specific AI capabilities
- **Context Management**: Shared context across agent interactions
- **Fallback Mechanisms**: Graceful degradation when AI services are unavailable

### External System Integration

#### 1. Payment Gateway Integration
- **Multiple Providers**: Support for various payment methods
- **Webhook Handling**: Real-time payment status updates
- **Reconciliation**: Automated payment matching

#### 2. Communication Services
- **Email Integration**: Automated notifications and communications
- **SMS Integration**: Critical alerts and reminders
- **Push Notifications**: Real-time mobile notifications

### File Storage Integration

#### 1. Supabase Storage
- **Bucket Organization**: Structured file organization
- **Access Control**: Row-level security for files
- **CDN Delivery**: Fast global file access

#### 2. File Processing
- **Image Optimization**: Automatic image resizing and compression
- **Document Processing**: PDF generation and manipulation
- **Virus Scanning**: Automated malware detection

---

This architecture documentation provides the foundation for understanding FabriiQ's technical implementation. The system is designed for scalability, security, and maintainability while providing an exceptional user experience across all stakeholders in the educational ecosystem.
