import { createPropertySelectors, createSelector } from "@ngxs/store";
import { DashboardState, DashboardStateModel } from "./dashboard.state";
import { MissionDetail } from "../../models/mission-detail.model";

export class DashboardSelectors {

  static slices = createPropertySelectors<DashboardStateModel>(DashboardState);

  static summaries() {
    return createSelector(
      [DashboardSelectors.slices.missions, DashboardSelectors.slices.selectedMissionId],
      (missions, selectedMissionId) => missions.map(mission => ({
        id: mission.id,
        name: mission.name,
        role: mission.role,
        selected: mission.id === selectedMissionId
      }))
    )
  }

  static selectedMissionDetail() {
    return createSelector(
      [DashboardSelectors.slices.missions, DashboardSelectors.slices.selectedMissionId],
      (missions, selectedMissionId) => {
        const mission = missions.find(mission => mission.id === selectedMissionId);
        if (!mission) return null;
        const lastInvoice = mission.invoices[mission.invoices.length - 1];
        return {
          name: mission.name,
          description: mission.description,
          skills: mission.skills,
          lastInvoice: {
            month: lastInvoice.month,
            dailyRate: lastInvoice.dailyRate
          },
          contact: {
            name: `${mission.contact.firstName} ${mission.contact.lastName}`,
            email: mission.contact.email,
            phone: mission.contact.phone
          }
        } as MissionDetail;
      }
    )
  }

  static metrics() {
    return createSelector(
      [DashboardSelectors.slices.missions, DashboardSelectors.slices.selectedMissionId],
      (missions, selectedMissionId) => {
        const invoices = missions
          .filter(mission => !selectedMissionId || mission.id === selectedMissionId)
          .flatMap(mission => mission.invoices)
          .filter(invoice => invoice.month.getFullYear() === new Date().getFullYear());

        const revenues = Array(12).fill(0);
        invoices.forEach(invoice => revenues[invoice.month.getMonth()] += invoice.dailyRate * invoice.workDaysCount);

        return {
          totalWorkedDays: invoices.reduce((count, invoice) => count + invoice.workDaysCount, 0),
          totalRevenues: invoices.reduce((count, invoice) => count + invoice.dailyRate * invoice.workDaysCount, 0),
          revenues
        }
      }
    );
  }

  static invoiceOptions() {
    return createSelector(
      [DashboardSelectors.slices.missions],
      missions => missions.map(mission => ({
        id: mission.id,
        name: mission.name,
        lastDailyRate: mission.invoices[mission.invoices.length - 1].dailyRate ?? null
      }))
    )
  }
}
