import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import About from './pages/About';
import Disclosure from './pages/Disclosure';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Admissions from './pages/Admissions';
import Scholarships from './pages/Scholarships';
import Departments from './pages/Departments';
import Faculty from './pages/Faculty';
import Facilities from './pages/Facilities';
import Committees from './pages/Committees';
import Placements from './pages/Placements';
import Alumni from './pages/Alumni';
import Examinations from './pages/Examinations';
import Downloads from './pages/Downloads';
import News from './pages/News';
import Gallery from './pages/Gallery';
import FAQ from './pages/Faq';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import AcademicResourcePage from './pages/AcademicResourcePage';
import Syllabus from './pages/Syllabus';
import TimeTable from './pages/TimeTable';
import AcademicCalendar from './pages/AcademicCalendar';
import EContent from './pages/EContent';
import ProgrammesOffered from './pages/ProgrammesOffered';
import Results from './pages/Results';

import PrincipalMessage from './pages/PrincipalMessage';
import VisionMission from './pages/VisionMission';          // (create next)
import Patrons from './pages/Patrons';                      // (create next)
import CodeOfConduct from './pages/CodeOfConduct';          // (create next)
import Distinctiveness from './pages/Distinctiveness';      // (create next)
import BestPractices from './pages/BestPractices';          // (create next)
import AboutContacts from './pages/AboutContacts';          // (create next)
import ProgrammeOutcomes from './pages/ProgrammeOutcomes';
import ManageAcademics from './pages/admin/ManageAcademics';
import ManageCommittee from './pages/admin/ManageCommittee';
import Prospectus from './pages/Prospectus';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageCourses from './pages/admin/ManageCourses';
import ManageNotifications from './pages/admin/ManageNotifications';
import ManageAdmissions from './pages/admin/ManageAdmissions';
import ManageFaculty from './pages/admin/ManageFaculty';
import ManageResults from './pages/admin/ManageResults';
import ManageGallery from './pages/admin/ManageGallery';
import ManageHeroSlides from './pages/admin/ManageHeroSlides';
import ManageProspectus from './pages/admin/ManageProspectus';
import ManageActivities from './pages/admin/ManageActivities';
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />

        <Routes>
          {/* ADMIN ROUTES (no Navbar/Footer) */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="notifications" element={<ManageNotifications />} />
            <Route path="admissions" element={<ManageAdmissions />} />
            <Route path="faculty" element={<ManageFaculty />} />
            <Route path="results" element={<ManageResults />} />
            <Route path="gallery" element={<ManageGallery />} />
             <Route path="hero-slides" element={<ManageHeroSlides />} />
             <Route path="academics" element={<ManageAcademics />} />
             <Route path="committee" element={<ManageCommittee />} />
             <Route path="prospectus" element={<ManageProspectus />} />
             <Route path="activities" element={<ManageActivities />} />
          </Route>

          {/* PUBLIC ROUTES (with Navbar/Footer) */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <main className="min-h-screen">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/disclosure" element={<Disclosure />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:id" element={<CourseDetail />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/scholarships" element={<Scholarships />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/faculty" element={<Faculty />} />
                    <Route path="/facilities" element={<Facilities />} />
                    <Route path="/committees" element={<Committees />} />
                    <Route path="/placements" element={<Placements />} />
                    <Route path="/alumni" element={<Alumni />} />
                    <Route path="/examinations" element={<Examinations />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />

                    <Route path="/academics/programmes" element={<ProgrammesOffered />} />
                    <Route path="/academics/outcomes/:stream" element={<ProgrammeOutcomes />} />
                    <Route path="/academics/calendar" element={<AcademicCalendar />} />
                    <Route path="/academics/time-table" element={<TimeTable />} />
                    <Route path="/academics/syllabus" element={<Syllabus />} />
                    <Route path="/academics/results" element={<Results />} />
                    <Route path="/academics/e-content" element={<EContent />} />

                    <Route path="/about/principal-message" element={<PrincipalMessage />} />
                    <Route path="/about/vision-mission" element={<VisionMission />} />
                    <Route path="/about/patrons" element={<Patrons />} />
                    <Route path="/about/code-of-conduct" element={<CodeOfConduct />} />
                    <Route path="/about/distinctiveness" element={<Distinctiveness />} />
                    <Route path="/about/best-practices" element={<BestPractices />} />
                    <Route path="/about/contacts" element={<AboutContacts />} />

                    <Route path="academics/prospectus" element={<Prospectus />} />
                  </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}