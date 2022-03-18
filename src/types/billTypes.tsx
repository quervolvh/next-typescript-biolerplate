export type recurringFrequencyType = { label: string, value: 'monthly' | 'weekly' | 'daily' | 'one-off' };
export type reminderFrequencyType = { label: string, value: '1-day' | '2-day' | '3-day' | '1-week' };

export type recurringFieldType = { recurring: true | false, frequency?: recurringFrequencyType , reminder?: reminderFrequencyType };
