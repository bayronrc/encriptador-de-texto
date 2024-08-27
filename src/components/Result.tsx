type ResultType = {
    resultado: string
    copy: boolean
    clipText: () => void
}

const Result = ({ resultado, clipText, copy: copiado }: ResultType) => {
    return (
        <>
            <p className="text-[#0a3871] text-lg text-center font-semibold mb-4">{resultado}</p>
            <button
                className={`w-full sm:w-64 h-12 rounded-3xl mt-4 font-normal transition-colors ${copiado
                    ? 'bg-green-500 text-white'
                    : 'bg-[#0a3871] text-white hover:bg-[#052051]'
                    }`}
                onClick={clipText}
            >
                {copiado ? 'Copiado!' : 'Copiar'}
            </button>
        </>
    )
}

export default Result