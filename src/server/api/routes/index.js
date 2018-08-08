import resources from '@server/api/routes/resources'
import auth from '@server/api/routes/auth'

export default (app, db) => {
    resources(app, db)
    auth(app, db)
}