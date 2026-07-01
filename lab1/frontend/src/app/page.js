import { Header } from '../components/Header';
import { WaterStatus } from '../components/WaterStatus';
import { MaintenanceLog } from '../components/MaintenanceLog';
import { Alert } from '../components/Alert';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <Header />
        <section className="grid gap-6 md:grid-cols-2">
          <WaterStatus />
          <Alert />
        </section>
        <MaintenanceLog />
      </div>
    </main>
  );
}
