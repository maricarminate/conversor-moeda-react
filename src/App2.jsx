import { useEffect, useState } from "react";
import Spinner from "./components/spinner";

function App2() {
    const [realValue, setRealValue] = useState(0);
    const [dollarValue, setDollarValue] = useState(0);
    const [loading, setLoading] = useState(false);

    const [convertedValue, setConvertedValue] = useState(null);

    // run once when the component mounts
    useEffect(() => {
        const fetchRates = async () => {
            const apiKey = "d7f88c6cff46bf03ad26a64d";
            const api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

            const response = await fetch(api);
            const data = await response.json();

            const dollar = data.conversion_rates["BRL"];

            return dollar;
        };

        setLoading(true);

        fetchRates()
            .then((dollar) => {
                setDollarValue(dollar);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const convertToDollar = async (value) => {
        console.log(value, dollarValue);
        if (value && value > 0) {
            const dollar = parseFloat(dollarValue) * parseFloat(value);
            setConvertedValue(dollar.toFixed(2));
        } else {
            alert("Digite um valor válido");
        }
    };

    return (
        <div className="min-w-screen min-h-screen bg-blue-50 flex flex-col justify-center items-center">
            {loading ? (
                <Spinner />
            ) : (
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
                        <h1 className="text-xl font-bold">
                            Conversor de Real para Dólar
                        </h1>

                        <form
                            className="flex flex-col space-y-3"
                            action={() => convertToDollar(realValue)}
                        >
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
                                    onChange={(e) =>
                                        setRealValue(e.target.value)
                                    }
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-4 bg-blue-500 text-white p-2 rounded-md cursor-pointer"
                            >
                                Converter
                            </button>
                        </form>
                    </div>

                    {convertedValue && (
                        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                            <p className="font-bold">USD {convertedValue}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App2;
