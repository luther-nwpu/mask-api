import db from '@libs/db'
export const Subscribe = db.Model.extend({
    tableName: 'subscribe',
    hasTimestamps: ['create_at', 'update_at']
}, {
}) as any
