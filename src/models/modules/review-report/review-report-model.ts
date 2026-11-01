import type { ReportListRow } from '../report/report-model'

export type ReviewReportListRow = Omit<ReportListRow, 'review'>
