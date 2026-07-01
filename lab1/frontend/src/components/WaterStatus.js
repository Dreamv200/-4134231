export function WaterStatus() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">Water Status</h2>
      <div className="mt-4 space-y-3 text-slate-700">
        <p><span className="font-medium">Status:</span> Normal</p>
        <p><span className="font-medium">Pressure:</span> 72 psi</p>
        <p><span className="font-medium">Flow Rate:</span> 120 L/min</p>
      </div>
    </div>
  );
}
