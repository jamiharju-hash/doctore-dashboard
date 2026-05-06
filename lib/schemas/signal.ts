import { z } from 'zod'

export const SignalSideSchema = z.enum(['home', 'away', 'over', 'under'])
export type SignalSide = z.infer<typeof SignalSideSchema>

export const SignalStatusSchema = z.enum(['active', 'settled', 'void'])
export type SignalStatus = z.infer<typeof SignalStatusSchema>

export const SignalSchema = z.object({
  id: z.string(),
  gameId: z.string(),
  league: z.literal('MLB'),
  market: z.string().min(1),
  side: SignalSideSchema,
  selection: z.string().min(1),
  modelProbability: z.number().min(0).max(1),
  impliedProbability: z.number().min(0).max(1),
  edgePct: z.number(),
  decimalOdds: z.number().positive(),
  kellyFraction: z.number().min(0),
  recommendedStakeUnits: z.number().min(0),
  confidence: z.number().min(0).max(1),
  status: SignalStatusSchema,
  featureBreakdown: z.record(z.string(), z.number()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
export type Signal = z.infer<typeof SignalSchema>

export const SignalListResponseSchema = z.object({
  signals: z.array(SignalSchema),
})
export type SignalListResponse = z.infer<typeof SignalListResponseSchema>
