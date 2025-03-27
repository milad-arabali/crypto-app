import React from 'react';

function Footer(props) {
    return (
        <div
            className="flex justify-center items-center w-full sm:w-[80%] md:w-[70%]
            lg:w-[60%] h-[81px] mx-auto mb-5 mt-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg">
            <p className="text-sm text-gray-700  ">
                <a
                    href="https://farazcode.ir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-5 text-white font-semibold hover:underline hover:text-blue-800 transition duration-300"
                >
                    farazcode.ir
                </a>
                ساخته شده توسط
            </p>
        </div>
    );
}

export default Footer;
