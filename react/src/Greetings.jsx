import React, { useEffect, useState } from "react";

const Greeting = (user) => {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting("Good morning");
        } else if (currentHour < 18) {
            setGreeting("Good day");
        } else {
            setGreeting("Good evening");
        }
    }, []);

    return <p>{greeting}, {user.user.name}, ready for work?</p>;
};

export default Greeting;
