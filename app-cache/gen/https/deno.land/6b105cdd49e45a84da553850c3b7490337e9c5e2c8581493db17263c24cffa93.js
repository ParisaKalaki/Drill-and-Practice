export default class RedisStore {
    keyPrefix;
    db;
    constructor(db, keyPrefix = 'session_'){
        this.keyPrefix = keyPrefix;
        this.db = db;
    }
    async sessionExists(sessionId) {
        const session = await this.db.get(this.keyPrefix + sessionId);
        return session ? true : false;
    }
    async getSessionById(sessionId) {
        const session = await this.db.get(this.keyPrefix + sessionId);
        if (session) {
            const sessionString = String(await this.db.get(this.keyPrefix + sessionId));
            const value = JSON.parse(sessionString);
            return value;
        } else {
            return null;
        }
    }
    async createSession(sessionId, initialData) {
        await this.db.set(this.keyPrefix + sessionId, JSON.stringify(initialData));
    }
    async deleteSession(sessionId) {
        await this.db.del(this.keyPrefix + sessionId);
    }
    async persistSessionData(sessionId, sessionData) {
        await this.db.set(this.keyPrefix + sessionId, JSON.stringify(sessionData));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvb2FrX3Nlc3Npb25zQHY0LjEuOS9zcmMvc3RvcmVzL1JlZGlzU3RvcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0b3JlIGZyb20gJy4vU3RvcmUudHMnXG5pbXBvcnQgdHlwZSB7IFJlZGlzIH0gZnJvbSAnaHR0cHM6Ly9kZW5vLmxhbmQveC9yZWRpc0B2MC4yNy4wL21vZC50cydcbmltcG9ydCB7IFNlc3Npb25EYXRhIH0gZnJvbSAnLi4vU2Vzc2lvbi50cydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVkaXNTdG9yZSBpbXBsZW1lbnRzIFN0b3JlIHtcbiAga2V5UHJlZml4IDogc3RyaW5nXG4gIGRiIDogUmVkaXNcblxuICBjb25zdHJ1Y3RvcihkYiA6IFJlZGlzLCBrZXlQcmVmaXggPSAnc2Vzc2lvbl8nKSB7XG4gICAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXhcbiAgICB0aGlzLmRiID0gZGJcbiAgfVxuXG4gIGFzeW5jIHNlc3Npb25FeGlzdHMoc2Vzc2lvbklkIDogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IHRoaXMuZGIuZ2V0KHRoaXMua2V5UHJlZml4ICsgc2Vzc2lvbklkKVxuICAgIHJldHVybiBzZXNzaW9uID8gdHJ1ZSA6IGZhbHNlXG4gIH1cblxuICBhc3luYyBnZXRTZXNzaW9uQnlJZChzZXNzaW9uSWQgOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgdGhpcy5kYi5nZXQodGhpcy5rZXlQcmVmaXggKyBzZXNzaW9uSWQpXG5cbiAgICBpZiAoc2Vzc2lvbikge1xuICAgICAgY29uc3Qgc2Vzc2lvblN0cmluZyA9IFN0cmluZyhhd2FpdCB0aGlzLmRiLmdldCh0aGlzLmtleVByZWZpeCArIHNlc3Npb25JZCkpXG4gICAgICBjb25zdCB2YWx1ZSA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0cmluZykgYXMgU2Vzc2lvbkRhdGFcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24oc2Vzc2lvbklkIDogc3RyaW5nLCBpbml0aWFsRGF0YTogU2Vzc2lvbkRhdGEpIHtcbiAgICBhd2FpdCB0aGlzLmRiLnNldCh0aGlzLmtleVByZWZpeCArIHNlc3Npb25JZCwgSlNPTi5zdHJpbmdpZnkoaW5pdGlhbERhdGEpKVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbihzZXNzaW9uSWQgOiBzdHJpbmcpIHtcbiAgICBhd2FpdCB0aGlzLmRiLmRlbCh0aGlzLmtleVByZWZpeCArIHNlc3Npb25JZClcbiAgfVxuXG4gIGFzeW5jIHBlcnNpc3RTZXNzaW9uRGF0YShzZXNzaW9uSWQgOiBzdHJpbmcsIHNlc3Npb25EYXRhIDogU2Vzc2lvbkRhdGEpIHtcbiAgICBhd2FpdCB0aGlzLmRiLnNldCh0aGlzLmtleVByZWZpeCArIHNlc3Npb25JZCwgSlNPTi5zdHJpbmdpZnkoc2Vzc2lvbkRhdGEpKVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsZUFBZSxNQUFNO0lBQ25CLFVBQWtCO0lBQ2xCLEdBQVU7SUFFVixZQUFZLEVBQVUsRUFBRSxZQUFZLFVBQVUsQ0FBRTtRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHO1FBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUc7SUFDWjtJQUVBLE1BQU0sY0FBYyxTQUFrQixFQUFFO1FBQ3RDLE1BQU0sVUFBVSxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUc7UUFDbkQsT0FBTyxVQUFVLElBQUksR0FBRyxLQUFLO0lBQy9CO0lBRUEsTUFBTSxlQUFlLFNBQWtCLEVBQUU7UUFDdkMsTUFBTSxVQUFVLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRztRQUVuRCxJQUFJLFNBQVM7WUFDWCxNQUFNLGdCQUFnQixPQUFPLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNoRSxNQUFNLFFBQVEsS0FBSyxLQUFLLENBQUM7WUFDekIsT0FBTztRQUNULE9BQU87WUFDTCxPQUFPLElBQUk7UUFDYixDQUFDO0lBQ0g7SUFFQSxNQUFNLGNBQWMsU0FBa0IsRUFBRSxXQUF3QixFQUFFO1FBQ2hFLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLEtBQUssU0FBUyxDQUFDO0lBQy9EO0lBRUEsTUFBTSxjQUFjLFNBQWtCLEVBQUU7UUFDdEMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHO0lBQ3JDO0lBRUEsTUFBTSxtQkFBbUIsU0FBa0IsRUFBRSxXQUF5QixFQUFFO1FBQ3RFLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLEtBQUssU0FBUyxDQUFDO0lBQy9EO0FBQ0YsQ0FBQyJ9