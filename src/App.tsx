import React from "react";
import "tippy.js/dist/tippy.css";
import './App.css'
import { AutomationProvider } from "./AutomationProvider";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <AutomationProvider>
      <Dashboard />
    </AutomationProvider>
  );
}