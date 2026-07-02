function DerechosCard({ titulo, descripcion }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-sky-700">
      <h2 className="text-xl font-bold text-sky-900 mb-3">
        {titulo}
      </h2>

      <p className="text-gray-700 leading-relaxed">
        {descripcion}
      </p>
    </div>
  )
}

export default DerechosCard