Feature Brainstorm:
- [x] Time inputted by user
- [x] Pause/unpause
- [ ] Countdown
- [x] Countup
- [x] Countdown/countup toggle
- [x] Ending notification
- [x] Toggle play state with spacebar
- [ ] Break notification
- [ ] Configure break prompts (every x minutes or x times per timer) and length

Bugs:
- [x] Time not updating when updated after playing / during pause
- [x] After previous updates timekeeping isn't accurate
	- Affecting other timers I can find online using the same method. I expect this is something to do with the browser being 'efficient' and disabling the tab at some point.
	- Log time timer is started, reference against current time, update that way instead.
	- Fixed, however countdown system is no longer working, disabled for now
- [ ] Button hints are inaccurate