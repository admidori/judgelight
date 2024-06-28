import React from "react";
import Menu from "./menu";
import Description from "./description";
import Case from "./case";
import Title from "./title";
import Appendix from "./appendix";

export default function Problem(){
    return (
        <div>
            <Menu />
            <Title />
            <Appendix />
            <Description />
            <Case />
        </div>
    );
}
