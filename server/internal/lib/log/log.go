package log

import "golang.org/x/exp/slog"

// Slog level
const (
	WARN = "WARN"
)

// Google Cloud Logging
const (
	WARNING  = "WARNING"
	SEVERITY = "severity"
)

func ReplaceLevelWithSeverity(groups []string, a slog.Attr) slog.Attr {
	if a.Key == slog.LevelKey && len(groups) == 0 {
		var value = a.Value.String()
		if value == WARN {
			value = WARNING
		}

		return slog.Attr{
			Key:   SEVERITY,
			Value: slog.StringValue(value),
		}
	}
	return a
}
