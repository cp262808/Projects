export default function Stats(){
  const stats = [
    { n:"350+", label:"Security Controls" },
    { n:"22+", label:"Technology Areas" },
    { n:"100+", label:"Implementation Examples" },
    { n:"500+", label:"Curated Resources" },
  ];
  return (
    <section className="py-12 bg-blue-900 text-white text-center">
      <div className="container grid gap-5 grid-cols-2 md:grid-cols-4">
        {stats.map(s => (
          <div key={s.label}>
            <div className="text-3xl font-extrabold text-blue-300">{s.n}</div>
            <div className="opacity-90">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
