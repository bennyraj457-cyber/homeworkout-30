import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { PwaProvider } from './context/PwaContext';
import { AppShell } from './components/AppShell';
import { HomeDashboard } from './pages/HomeDashboard';
import {
  CategoryPlaceholder,
  ProfileTabPlaceholder,
} from './pages/PlaceholderScreens';

// Route-level code splitting for fast initial mobile load
const WeeklyPlanPage = lazy(() =>
  import('./pages/WeeklyPlanPage').then((mod) => ({
    default: mod.WeeklyPlanPage,
  }))
);
const WorkoutLibrary = lazy(() =>
  import('./pages/WorkoutLibrary').then((mod) => ({
    default: mod.WorkoutLibrary,
  }))
);
const WorkoutDetails = lazy(() =>
  import('./pages/WorkoutDetails').then((mod) => ({
    default: mod.WorkoutDetails,
  }))
);
const ExerciseLibrary = lazy(() =>
  import('./pages/ExerciseLibrary').then((mod) => ({
    default: mod.ExerciseLibrary,
  }))
);
const ExerciseDetails = lazy(() =>
  import('./pages/ExerciseDetails').then((mod) => ({
    default: mod.ExerciseDetails,
  }))
);
const ActiveWorkout = lazy(() =>
  import('./pages/ActiveWorkout').then((mod) => ({
    default: mod.ActiveWorkout,
  }))
);
const WorkoutHistoryPage = lazy(() =>
  import('./pages/WorkoutHistoryPage').then((mod) => ({
    default: mod.WorkoutHistoryPage,
  }))
);
const WorkoutHistoryDetailsPage = lazy(() =>
  import('./pages/WorkoutHistoryDetailsPage').then((mod) => ({
    default: mod.WorkoutHistoryDetailsPage,
  }))
);
const DesignSystemShowcase = lazy(() =>
  import('./design-system/DesignSystemShowcase').then((mod) => ({
    default: mod.DesignSystemShowcase,
  }))
);

function DesignSystemRouteWrapper() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-[#1E293B] text-white px-4 py-2 text-[12px] font-semibold flex items-center justify-between">
        <span>Viewing HomeFit 30 Complete UI Design System Reference</span>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-[11px] transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to Home Dashboard
        </button>
      </div>
      <Suspense
        fallback={
          <div className="p-10 text-center text-[14px] font-semibold text-[#4B5563]">
            Loading UI Design System Showcase...
          </div>
        }
      >
        <DesignSystemShowcase />
      </Suspense>
    </div>
  );
}

export function App() {
  return (
    <PwaProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="min-h-screen bg-white flex items-center justify-center p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#E53935] text-white font-extrabold text-[13px] flex items-center justify-center animate-pulse">
                  30
                </div>
                <span className="text-[14px] font-bold text-[#4B5563]">
                  Loading HomeFit 30...
                </span>
              </div>
            </div>
          }
        >
          <Routes>
          {/* Main HomeFit 30 Dashboard & App Shell Routes */}
          <Route
            path="/"
            element={
              <AppShell>
                <HomeDashboard />
              </AppShell>
            }
          />

          {/* Dedicated Repeating 7-Day Weekly Plan Page */}
          <Route
            path="/weekly-plan"
            element={
              <AppShell>
                <WeeklyPlanPage />
              </AppShell>
            }
          />

          {/* Workout Library & Workout Details Routes */}
          <Route
            path="/workouts"
            element={
              <AppShell>
                <WorkoutLibrary />
              </AppShell>
            }
          />
          <Route
            path="/workouts/:workoutId"
            element={
              <AppShell>
                <WorkoutDetails />
              </AppShell>
            }
          />

          {/* Exercise Library (24 Exercises) & Exercise Details Routes */}
          <Route
            path="/exercises"
            element={
              <AppShell>
                <ExerciseLibrary />
              </AppShell>
            }
          />
          <Route
            path="/exercises/:exerciseId"
            element={
              <AppShell>
                <ExerciseDetails />
              </AppShell>
            }
          />

          {/* Complete Functional Active Workout Experience */}
          <Route
            path="/workout/active"
            element={
              <AppShell>
                <ActiveWorkout />
              </AppShell>
            }
          />

          {/* Progress Tracking, Analytics & Workout History Routes */}
          <Route
            path="/progress"
            element={
              <AppShell>
                <WorkoutHistoryPage />
              </AppShell>
            }
          />
          <Route
            path="/progress/:sessionId"
            element={
              <AppShell>
                <WorkoutHistoryDetailsPage />
              </AppShell>
            }
          />

          {/* Muscle Category & Profile Navigation Routes */}
          <Route
            path="/category/:slug"
            element={
              <AppShell>
                <CategoryPlaceholder />
              </AppShell>
            }
          />
          <Route
            path="/profile"
            element={
              <AppShell>
                <ProfileTabPlaceholder />
              </AppShell>
            }
          />

          {/* Standalone UI Design System Showcase Page */}
          <Route path="/design-system" element={<DesignSystemRouteWrapper />} />

          {/* Fallback to Home Dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </PwaProvider>
  );
}

export default App;
