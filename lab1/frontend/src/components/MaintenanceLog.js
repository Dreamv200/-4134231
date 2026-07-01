export function MaintenanceLog() {
  const logs = [
    { id: 1, task: 'Valve inspection', status: 'Completed', date: '2026-06-28' },
    { id: 2, task: 'Pipe leak check', status: 'In Progress', date: '2026-06-30' },
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">Maintenance Log</h2>
      <ul className="mt-4 space-y-3">
        {logs.map((log) => (
          <li key={log.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <div>
              <p className="font-medium text-slate-800">{log.task}</p>
              <p className="text-sm text-slate-500">{log.date}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{log.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
