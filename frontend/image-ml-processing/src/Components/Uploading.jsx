import React, { useState } from 'react';
import { Circles } from 'react-loader-spinner';
const Uploading = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [outputImage, setOutputImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
        setOutputImage(null);
    };

    const handleImageSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", Event.target.files[0]);

        try {
            const response = await fetch("API_ENDPOINT_HERE", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setOutputImage(result.outputImageUrl);
                console.error("Error processing image: ", response.statusText);
            }
        } catch (error) {
            console.error("Error processing image: ", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            {/* Navbar */}
            <nav className="bg-purple-800 p-4 text-white">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-3xl font-extrabold">Stride</div>
                    <div className="space-x-10">
                        <a href="/home" className="hover:text-gray-200">Home</a>
                        <a href="/features" className="hover:text-gray-200">Features</a>
                        <a href="/about" className="hover:text-gray-200">About</a>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-100">
                <div className="flex space-x-8 mb-8">

                    {/* Uploaded Image Section */}
                    <div className="w-96 h-72 border-2 border-dashed border-gray-300 flex justify-center items-center bg-white">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Uploaded" className="max-w-full max-h-full object-contain" />
                        ) : (
                            <span className="text-gray-500">Upload an Image</span>
                        )}
                    </div>

                    {/* Processed Image Section */}
                    <div className="w-96 h-72 border-2 border-dashed border-gray-300 flex justify-center items-center bg-white">
                        {loading ? (
                            <Circles color="#00BFFF" height={80} width={80} />
                        ) : outputImage ? (
                            <img src={outputImage} alt="Processed" className="max-w-full max-h-full object-contain" />
                        ) : (
                            <span className="text-gray-500">Processed Image</span>
                        )}
                    </div>
                </div>

                {/* Upload and Process Button */}
                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className=" px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <button
                        onClick={handleImageSubmit}
                        disabled={!selectedImage}
                        className={`px-6 py-2 rounded-md text-white ${selectedImage ? 'bg-purple-800' : 'bg-gray-300 cursor-not-allowed'}`}
                    >
                        Process Image
                    </button>
                </div>

                {/* Download Button */}
                {outputImage && (
                    <a href={outputImage} download="output_image.png" className="mt-4">
                        <button className="px-6 py-2 bg-green-500 text-white rounded-md">
                            Download Output Image
                        </button>
                    </a>
                )}
            </div>

        </div>
    )
}

export default Uploading
