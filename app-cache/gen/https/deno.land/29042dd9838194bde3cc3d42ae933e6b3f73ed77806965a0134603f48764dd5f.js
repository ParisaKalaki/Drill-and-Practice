export const customRandom = (random, alphabet, size)=>{
    const mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
    const step = -~(1.6 * mask * size / alphabet.length);
    return ()=>{
        let id = "";
        while(true){
            const bytes = random(step);
            let i = step;
            while(i--){
                // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
                id += alphabet[bytes[i] & mask] || '';
                if (id.length === +size) return id;
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvbmFub2lkQHYzLjAuMC9jdXN0b21SYW5kb20udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgQ3VzdG9tUmFuZG9tR2VuZXJhdG9yID0gKHNpemU6IG51bWJlcikgPT4gVWludDhBcnJheSB8IFVpbnQxNkFycmF5IHwgVWludDMyQXJyYXk7XG5cbmV4cG9ydCBjb25zdCBjdXN0b21SYW5kb20gPSAocmFuZG9tOiBDdXN0b21SYW5kb21HZW5lcmF0b3IsIGFscGhhYmV0OiBzdHJpbmcsIHNpemU6IG51bWJlcikgPT4ge1xuICBjb25zdCBtYXNrID0gKDIgPDwgKE1hdGgubG9nKGFscGhhYmV0Lmxlbmd0aCAtIDEpIC8gTWF0aC5MTjIpKSAtIDE7XG4gIGNvbnN0IHN0ZXAgPSAtfigxLjYgKiBtYXNrICogc2l6ZSAvIGFscGhhYmV0Lmxlbmd0aCk7XG5cbiAgcmV0dXJuICgpOiBzdHJpbmcgPT4ge1xuICAgIGxldCBpZCA9IFwiXCI7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IGJ5dGVzID0gcmFuZG9tKHN0ZXApO1xuICAgICAgbGV0IGkgPSBzdGVwO1xuICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAvLyBBZGRpbmcgYHx8ICcnYCByZWZ1c2VzIGEgcmFuZG9tIGJ5dGUgdGhhdCBleGNlZWRzIHRoZSBhbHBoYWJldCBzaXplLlxuICAgICAgICBpZCArPSBhbHBoYWJldFtieXRlc1tpXSAmIG1hc2tdIHx8ICcnO1xuICAgICAgICBpZiAoaWQubGVuZ3RoID09PSArc2l6ZSkgcmV0dXJuIGlkO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLE1BQU0sZUFBZSxDQUFDLFFBQStCLFVBQWtCLE9BQWlCO0lBQzdGLE1BQU0sT0FBTyxDQUFDLEtBQU0sS0FBSyxHQUFHLENBQUMsU0FBUyxNQUFNLEdBQUcsS0FBSyxLQUFLLEdBQUcsQUFBQyxJQUFJO0lBQ2pFLE1BQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sT0FBTyxTQUFTLE1BQU07SUFFbkQsT0FBTyxJQUFjO1FBQ25CLElBQUksS0FBSztRQUNULE1BQU8sSUFBSSxDQUFFO1lBQ1gsTUFBTSxRQUFRLE9BQU87WUFDckIsSUFBSSxJQUFJO1lBQ1IsTUFBTyxJQUFLO2dCQUNWLHVFQUF1RTtnQkFDdkUsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxLQUFLLElBQUk7Z0JBQ25DLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxNQUFNLE9BQU87WUFDbEM7UUFDRjtJQUNGO0FBQ0YsRUFBQyJ9