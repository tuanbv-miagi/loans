import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/Auth";
import DashboardLayout from "../layouts/Dashboard";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import CustomerPage from "../pages/customer/index";
import CreateCustomerPage from "../pages/customer/create";
import CustomerUpdatePage from "../pages/customer/update";
import CustomerShowPage from "../pages/customer/show";
import LoanPage from "../pages/loan/index";
import LoanCreatePage from "../pages/loan/create";
import LoanShowPage from "../pages/loan/show";
import LoanEditPage from "../pages/loan/edit";
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
        path="/customers/create"
        element={
          <DashboardLayout>
            <CreateCustomerPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/customers/:id"
        element={
          <DashboardLayout>
            <CustomerShowPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/customers/:id/edit"
        element={
          <DashboardLayout>
            <CustomerUpdatePage />
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
        path="/loans/create"
        element={
          <DashboardLayout>
            <LoanCreatePage />
          </DashboardLayout>
        }
      />
      <Route
        path="/loans/:id"
        element={
          <DashboardLayout>
            <LoanShowPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/loans/:id/edit"
        element={
          <DashboardLayout>
            <LoanEditPage />
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
