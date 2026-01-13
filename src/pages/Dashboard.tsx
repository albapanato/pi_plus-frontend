import GridBoard from "../components/dashboard/GridBoard";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div className="container-fluid p-4 d-flex flex-column gap-4">
      <GridBoard />
      <RecentActivity />
    </div>
  );
}