/** @format */

import React from "react";

type Props = {
    text: string;
};

function Heading({ text }: Props) {
    return (
        <div className="flex flex-col text-center w-full mb-2">
            <h1 className="sm:text-3xl text-2xl font-semibold title-font mb-4 text-white uppercase tracking-wider">
                {text}
            </h1>
        </div>
    );
}

export default Heading;
