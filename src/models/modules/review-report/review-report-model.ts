import type { ReportListRow } from '@/models/modules/report/report-model'

export type ReviewReportListRow = Omit<ReportListRow, 'review'>
