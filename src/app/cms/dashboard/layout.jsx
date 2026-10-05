import CmsNavigation from "./CmsNavigation";

export default function CmsDashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f5f3ff]">
      <CmsNavigation />

      <div className="lg:pl-64">{children}</div>
    </div>
  );
}
