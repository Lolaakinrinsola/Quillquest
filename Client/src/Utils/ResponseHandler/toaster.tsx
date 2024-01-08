import React from "react";
import classNames from "classnames";
 import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { HiLightningBolt } from "react-icons/hi";

//  import styles from "./actions.module.css";
import { GrStatusGood } from "react-icons/gr";

export const notify = ({ header, details, icon }: any) =>

    toast.custom(
        (t: any) => (
            <div
                className={classNames([
                   
                    t.visible ? "top-0 bg-white rounded-md p-[20px] text-center relative shadow-md border-2" : "-top-96",
                ])}
            >
                <div className={` grid m-auto justify-center items-center`}>
                    <span style={{ width: 10, height: 10 }} className='m-auto' >
                        {icon || <HiLightningBolt />}
                    </span>
                </div>
                <div className={` mt-[40px]`}>
                    <h1 className="font-bold text-lg">{header || ""}</h1>
                    <p>
                        {details || ""}
                    </p>
                </div>
                <div className='absolute top-[5%] right-[5%]' onClick={() => toast.dismiss(t.id)}>
                    <MdOutlineClose color="black" />
                </div>
            </div>
        ),
        { id: "unique-notification", position: "top-center" }
    );