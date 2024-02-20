package health

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestRegister(t *testing.T) {
	type args struct {
		endpoint string
		r        *gin.Engine
	}
	tests := []struct {
		name           string
		args           args
		expectedStatus int
		expectedBody   string
	}{
		{
			name:           "TestRegisterInternalEndpoint",
			args:           args{INTERNAL_ENDPOINT, gin.Default()},
			expectedStatus: http.StatusOK,
			expectedBody:   `{"status":"ok"}`,
		},
		{
			name:           "TestRegisterExternalEndpoint",
			args:           args{EXTERNAL_ENDPOINT, gin.Default()},
			expectedStatus: http.StatusOK,
			expectedBody:   `{"status":"ok"}`,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			Register(tt.args.endpoint, tt.args.r)

			w := httptest.NewRecorder()
			req, _ := http.NewRequest("GET", tt.args.endpoint, nil)

			tt.args.r.ServeHTTP(w, req)

			if w.Code != tt.expectedStatus {
				t.Errorf("Expected status code %d, got %d", tt.expectedStatus, w.Code)
			}

			if w.Body.String() != tt.expectedBody {
				t.Errorf("Expected body %s, got %s", tt.expectedBody, w.Body.String())
			}
		})
	}
}
