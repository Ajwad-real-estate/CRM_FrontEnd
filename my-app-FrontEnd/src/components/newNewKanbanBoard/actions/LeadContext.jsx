import { createContext, useContext, useState } from "react";

const LeadContext = createContext();

function LeadOptionsProvider({ children }) {
  //add Your Own state and Functions Here
  const [TabValue, setTabValue] = useState(3);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    console.log(TabValue);
  };
  //
  return (
    <LeadContext.Provider value={{ handleTabChange, TabValue }}>
      {children}
    </LeadContext.Provider>
  );
}

function useLeadOpt() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error(`You 're consuming the Context out of the Provider`);
  }
  return context;
}
export { LeadOptionsProvider, useLeadOpt };
