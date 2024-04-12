import React, { useEffect, useState } from "react";


export function Form(){
    return (
        <div>
            <form>
                <label>
                Name:
                <input type="text" name = "name" />
                </label>
            </form>
        </div>
    );
}

