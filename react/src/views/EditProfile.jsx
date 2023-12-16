import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import EditProfileCard from "../components/Cards/EditProfileCard";

export default function EditProfile() {
    const { user, setUser } = useStateContext();

    return <EditProfileCard user={user} setUser={setUser}/>;
}