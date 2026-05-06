import { z } from 'zod'

export const GameStatusSchema = z.enum(['scheduled', 'live', 'final', 'postponed', 'cancelled'])
export type GameStatus = z.infer<typeof GameStatusSchema>

export const GameSchema = z.object({
  id: z.string(),
  league: z.literal('MLB'),
  commenceTime: z.string().datetime(),
  homeTeam: z.string().min(1),
  awayTeam: z.string().min(1),
  venue: z.string().optional(),
  status: GameStatusSchema,
  homeScore: z.number().int().nonnegative().optional(),
  awayScore: z.number().int().nonnegative().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})
export type Game = z.infer<typeof GameSchema>

export const GameListResponseSchema = z.object({
  games: z.array(GameSchema),
})
export type GameListResponse = z.infer<typeof GameListResponseSchema>
