import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import ProfileCard from "../components/Cards/ProfileCard";

export default function Profile() {
    const { user } = useStateContext();
    return <ProfileCard user={user}/>;
}
