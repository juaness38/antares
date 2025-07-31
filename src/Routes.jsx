import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import ExperimentDesigner from "pages/experiment-designer";
import DeviceManagement from "pages/device-management";
import AnalysisQueue from "pages/analysis-queue";
import ResultsVisualization from "pages/results-visualization";
import RealTimeMonitoring from "pages/real-time-monitoring";
import PromptProtocols from "pages/prompt-protocols";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/experiment-designer" element={<ExperimentDesigner />} />
        <Route path="/device-management" element={<DeviceManagement />} />
        <Route path="/analysis-queue" element={<AnalysisQueue />} />
        <Route path="/results-visualization" element={<ResultsVisualization />} />
        <Route path="/real-time-monitoring" element={<RealTimeMonitoring />} />
        <Route path="/prompt-protocols" element={<PromptProtocols />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;