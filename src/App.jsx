import { useEffect, useState } from "react";
import Spinner from "./components/spinner";

function App() {
    const [realValue, setRealValue] = useState(0);
    const [dollarValue, setDollarValue] = useState(null);
    const [loading, setLoading] = useState(false);

    const apiKey = "d7f88c6cff46bf03ad26a64d";
    const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    // run once when the component mounts
    useEffect(() => {}, []);

    // run when realValue changes
    // useEffect(() => {

    // }, [realValue]);

    const convertToDollar = async (value) => {
        setLoading(true);
        try {
            const response = await fetch(api);
            const data = await response.json();

            const dollar = data.conversion_rates["BRL"] * value;
            setDollarValue(dollar.toFixed(2));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-w-screen min-h-screen bg-blue-50 flex flex-col justify-center items-center">
            <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
                    <h1 className="text-xl font-bold">
                        Conversor de Real para Dólar
                    </h1>

                    <form className="flex flex-col">
                        <div className="flex flex-col space-y-1">
                            <label
                                htmlFor="real-input"
                                className="flex-1 text-sm ml-1"
                            >
                                Digite o valor em Real (R$)
                            </label>
                            <input
                                type="number"
                                name="real-input"
                                id="real-input"
                                placeholder="Digite o valor em Real"
                                min={0}
                                value={realValue}
                                className="border-gray-200 border-1 rounded-lg py-1 px-2"
                                onChange={(e) => setRealValue(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="mt-4 bg-blue-500 text-white p-2 rounded-md"
                            onClick={() => convertToDollar(realValue)}
                        >
                            Converter
                        </button>
                    </form>
                </div>

                {(dollarValue || loading) && (
                    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                        {/* if is loading show loading text else, shows dollar value */}
                        {loading ? (
                            <Spinner />
                        ) : (
                            dollarValue && (
                                <p className="font-bold">USD {dollarValue}</p>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
