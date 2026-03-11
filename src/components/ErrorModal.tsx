import React from "react";
import { useAutomationData } from "../AutomationContext";
import { IoWarning } from "react-icons/io5";
import { ApiError } from "../utils/types";

const Warning = IoWarning as unknown as React.FC<{ color: string }>;

export default function ErrorModal() {
  const { error } = useAutomationData();
  return (
    <div className="modalBackdrop">
      <div className="modal">
        <h2><Warning color="red" /> An error occurred while trying to get the data from timberborn!</h2>
        {error === ApiError.CORS && (
          <p>Timberborn is running but CORS policies are blocking the usage of the HTTP API. The easiest solution to circumvent this is to download the <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3682669754" target="_blank" rel="noreferrer">Remote API Access mod</a> from the workshop. This mod will allow the HTTP API to be accessed without CORS restrictions.</p>
        )}
        {error === ApiError.NOT_FOUND && (
          <p>Looks like the API didn't return any data. Do you have a lever or an adapter connected in game, and is your game running?</p>
        )}
        {error === ApiError.UNKNOWN && (
          <p>An unknown error occurred. Please try again later.</p>
        )}
      </div>
    </div>
  );
}
