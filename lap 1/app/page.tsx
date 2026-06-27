export default function HomePage() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Water Turbidity Monitoring</p>
        <h1>ระบบวัดระดับความขุ่นของน้ำ</h1>
        <p>
          ติดตามระดับความขุ่นของน้ำ แจ้งเตือนเมื่อเกินค่าที่กำหนด
          และดูประวัติการล้างถังและซ่อมบำรุงได้จากเว็บเดียว
        </p>
        <a href="#features" className="button">
          ดูฟีเจอร์หลัก
        </a>
      </section>

      <section id="features" className="grid">
        <article className="card">
          <h2>ตรวจวัดและแสดงผล</h2>
          <p>แสดงข้อมูลระดับความขุ่นของน้ำแบบเข้าใจง่ายและสั้นกระชับ</p>
        </article>
        <article className="card">
          <h2>แจ้งเตือนอัตโนมัติ</h2>
          <p>ช่วยเตือนเมื่อระดับความขุ่นสูงเกินเกณฑ์ที่กำหนดไว้</p>
        </article>
        <article className="card">
          <h2>บันทึกประวัติ</h2>
          <p>เก็บข้อมูลการล้างถังและงานซ่อมบำรุงเพื่อดูย้อนหลังได้</p>
        </article>
      </section>
    </main>
  );
}
