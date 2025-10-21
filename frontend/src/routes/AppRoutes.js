import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/Auth";
import DashboardLayout from "../layouts/Dashboard";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import CustomerPage from "../pages/customer/index";
import LoanPage from "../pages/loan/index";
import SettingPage from "../pages/setting/index";
import UserPage from "../pages/user/index";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages */}
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />

      {/* Dashboard pages */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/users"
        element={
          <DashboardLayout>
            <UserPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/customers"
        element={
          <DashboardLayout>
            <CustomerPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/loans"
        element={
          <DashboardLayout>
            <LoanPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <SettingPage />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
