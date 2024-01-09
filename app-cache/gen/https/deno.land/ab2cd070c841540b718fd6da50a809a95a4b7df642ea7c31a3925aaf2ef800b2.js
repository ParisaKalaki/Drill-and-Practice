export default class WebdisStore {
    url;
    keyPrefix;
    constructor(options){
        this.url = options.url;
        this.keyPrefix = options.keyPrefix || 'session_';
    }
    async sessionExists(sessionId) {
        const payload = await fetch(this.url + '/GET/' + this.keyPrefix + sessionId);
        const payloadJSON = await payload.json();
        const session = payloadJSON.GET;
        return session ? true : false;
    }
    async getSessionById(sessionId) {
        const payload = await fetch(this.url + '/GET/' + this.keyPrefix + sessionId);
        const payloadJSON = await payload.json();
        const session = payloadJSON.GET;
        if (session) {
            return JSON.parse(session);
        } else {
            return null;
        }
    }
    async createSession(sessionId, initialData) {
        await fetch(this.url + '/SET/' + this.keyPrefix + sessionId + '/' + JSON.stringify(initialData));
    }
    async deleteSession(sessionId) {
        await fetch(this.url + '/DEL/' + this.keyPrefix + sessionId);
    }
    async persistSessionData(sessionId, sessionData) {
        await fetch(this.url + '/SET/' + this.keyPrefix + sessionId + '/' + encodeURI(JSON.stringify(sessionData)));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvb2FrX3Nlc3Npb25zQHY0LjEuOS9zcmMvc3RvcmVzL1dlYmRpc1N0b3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlLnRzJ1xuaW1wb3J0IHsgU2Vzc2lvbkRhdGEgfSBmcm9tICcuLi9TZXNzaW9uLnRzJ1xuXG50eXBlIFdlYmRpc09wdGlvbnMgPSB7XG4gIHVybCA6IHN0cmluZyxcbiAga2V5UHJlZml4Pzogc3RyaW5nLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJkaXNTdG9yZSBpbXBsZW1lbnRzIFN0b3JlIHtcbiAgdXJsOiBzdHJpbmdcbiAga2V5UHJlZml4OiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zIDogV2ViZGlzT3B0aW9ucykge1xuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmxcbiAgICB0aGlzLmtleVByZWZpeCA9IG9wdGlvbnMua2V5UHJlZml4IHx8ICdzZXNzaW9uXydcbiAgfVxuXG4gIGFzeW5jIHNlc3Npb25FeGlzdHMoc2Vzc2lvbklkIDogc3RyaW5nKSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IGZldGNoKHRoaXMudXJsICsgJy9HRVQvJyArIHRoaXMua2V5UHJlZml4ICsgc2Vzc2lvbklkKVxuICAgIGNvbnN0IHBheWxvYWRKU09OID0gYXdhaXQgcGF5bG9hZC5qc29uKClcbiAgICBjb25zdCBzZXNzaW9uID0gcGF5bG9hZEpTT04uR0VUXG4gICAgcmV0dXJuIHNlc3Npb24gPyB0cnVlIDogZmFsc2VcbiAgfVxuXG4gIGFzeW5jIGdldFNlc3Npb25CeUlkKHNlc3Npb25JZCA6IHN0cmluZykge1xuICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCBmZXRjaCh0aGlzLnVybCArICcvR0VULycgKyB0aGlzLmtleVByZWZpeCArIHNlc3Npb25JZClcbiAgICBjb25zdCBwYXlsb2FkSlNPTiA9IGF3YWl0IHBheWxvYWQuanNvbigpXG4gICAgY29uc3Qgc2Vzc2lvbiA9IHBheWxvYWRKU09OLkdFVFxuXG4gICAgaWYgKHNlc3Npb24pIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHNlc3Npb24pIGFzIFNlc3Npb25EYXRhXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlU2Vzc2lvbihzZXNzaW9uSWQgOiBzdHJpbmcsIGluaXRpYWxEYXRhIDogU2Vzc2lvbkRhdGEpIHtcbiAgICBhd2FpdCBmZXRjaCh0aGlzLnVybCArICcvU0VULycgKyB0aGlzLmtleVByZWZpeCArIHNlc3Npb25JZCArICcvJytKU09OLnN0cmluZ2lmeShpbml0aWFsRGF0YSkpXG4gIH1cblxuICBhc3luYyBkZWxldGVTZXNzaW9uKHNlc3Npb25JZCA6IHN0cmluZykge1xuICAgIGF3YWl0IGZldGNoKHRoaXMudXJsICsgJy9ERUwvJyArIHRoaXMua2V5UHJlZml4ICsgc2Vzc2lvbklkKVxuICB9XG5cbiAgYXN5bmMgcGVyc2lzdFNlc3Npb25EYXRhKHNlc3Npb25JZCA6IHN0cmluZywgc2Vzc2lvbkRhdGEgOiBTZXNzaW9uRGF0YSkge1xuICAgIGF3YWl0IGZldGNoKHRoaXMudXJsICsgJy9TRVQvJyArIHRoaXMua2V5UHJlZml4ICsgc2Vzc2lvbklkICsgJy8nICsgZW5jb2RlVVJJKEpTT04uc3RyaW5naWZ5KHNlc3Npb25EYXRhKSkpXG4gIH1cbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsZUFBZSxNQUFNO0lBQ25CLElBQVc7SUFDWCxVQUFpQjtJQUVqQixZQUFZLE9BQXVCLENBQUU7UUFDbkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLEdBQUc7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLFNBQVMsSUFBSTtJQUN4QztJQUVBLE1BQU0sY0FBYyxTQUFrQixFQUFFO1FBQ3RDLE1BQU0sVUFBVSxNQUFNLE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLElBQUksQ0FBQyxTQUFTLEdBQUc7UUFDbEUsTUFBTSxjQUFjLE1BQU0sUUFBUSxJQUFJO1FBQ3RDLE1BQU0sVUFBVSxZQUFZLEdBQUc7UUFDL0IsT0FBTyxVQUFVLElBQUksR0FBRyxLQUFLO0lBQy9CO0lBRUEsTUFBTSxlQUFlLFNBQWtCLEVBQUU7UUFDdkMsTUFBTSxVQUFVLE1BQU0sTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRztRQUNsRSxNQUFNLGNBQWMsTUFBTSxRQUFRLElBQUk7UUFDdEMsTUFBTSxVQUFVLFlBQVksR0FBRztRQUUvQixJQUFJLFNBQVM7WUFDWCxPQUFPLEtBQUssS0FBSyxDQUFDO1FBQ3BCLE9BQU87WUFDTCxPQUFPLElBQUk7UUFDYixDQUFDO0lBQ0g7SUFFQSxNQUFNLGNBQWMsU0FBa0IsRUFBRSxXQUF5QixFQUFFO1FBQ2pFLE1BQU0sTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLE1BQUksS0FBSyxTQUFTLENBQUM7SUFDbkY7SUFFQSxNQUFNLGNBQWMsU0FBa0IsRUFBRTtRQUN0QyxNQUFNLE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxVQUFVLElBQUksQ0FBQyxTQUFTLEdBQUc7SUFDcEQ7SUFFQSxNQUFNLG1CQUFtQixTQUFrQixFQUFFLFdBQXlCLEVBQUU7UUFDdEUsTUFBTSxNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksTUFBTSxVQUFVLEtBQUssU0FBUyxDQUFDO0lBQy9GO0FBQ0YsQ0FBQyJ9