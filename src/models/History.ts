import db from '@libs/db'
export const History = db.Model.extend({
    tableName: 'history',
    hasTimestamps: ['create_at', 'update_at']
}, {
}) as any
