import { z } from 'zod'

export const BankrollSettingsSchema = z.object({
  bankrollUnits: z.number().positive(),
  maxStakePct: z.number().min(0).max(1),
  kellyMultiplier: z.number().min(0).max(1),
})
export type BankrollSettings = z.infer<typeof BankrollSettingsSchema>

export const UserSettingsSchema = z.object({
  userId: z.string(),
  bankroll: BankrollSettingsSchema,
  minEdgePct: z.number().min(0),
  enabledMarkets: z.array(z.string().min(1)),
  notificationsEnabled: z.boolean(),
  updatedAt: z.string().datetime(),
})
export type UserSettings = z.infer<typeof UserSettingsSchema>
