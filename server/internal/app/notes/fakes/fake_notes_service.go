// Code generated by counterfeiter. DO NOT EDIT.
package fakes

import (
	"context"
	"server/graph/model"
	"server/internal/app/notes"
	"sync"
)

type FakeNotesService struct {
	CreateStub        func(context.Context, string, model.CreateNote) (*model.Note, error)
	createMutex       sync.RWMutex
	createArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 model.CreateNote
	}
	createReturns struct {
		result1 *model.Note
		result2 error
	}
	createReturnsOnCall map[int]struct {
		result1 *model.Note
		result2 error
	}
	GetStub        func(context.Context, string, string) (*model.Note, error)
	getMutex       sync.RWMutex
	getArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 string
	}
	getReturns struct {
		result1 *model.Note
		result2 error
	}
	getReturnsOnCall map[int]struct {
		result1 *model.Note
		result2 error
	}
	ListStub        func(context.Context, string, string) ([]*model.Note, error)
	listMutex       sync.RWMutex
	listArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 string
	}
	listReturns struct {
		result1 []*model.Note
		result2 error
	}
	listReturnsOnCall map[int]struct {
		result1 []*model.Note
		result2 error
	}
	RemoveDeletedStub        func(context.Context, string) ([]*model.Note, error)
	removeDeletedMutex       sync.RWMutex
	removeDeletedArgsForCall []struct {
		arg1 context.Context
		arg2 string
	}
	removeDeletedReturns struct {
		result1 []*model.Note
		result2 error
	}
	removeDeletedReturnsOnCall map[int]struct {
		result1 []*model.Note
		result2 error
	}
	UpdateStub        func(context.Context, string, model.UpdateNote) (*model.Note, error)
	updateMutex       sync.RWMutex
	updateArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 model.UpdateNote
	}
	updateReturns struct {
		result1 *model.Note
		result2 error
	}
	updateReturnsOnCall map[int]struct {
		result1 *model.Note
		result2 error
	}
	invocations      map[string][][]interface{}
	invocationsMutex sync.RWMutex
}

func (fake *FakeNotesService) Create(arg1 context.Context, arg2 string, arg3 model.CreateNote) (*model.Note, error) {
	fake.createMutex.Lock()
	ret, specificReturn := fake.createReturnsOnCall[len(fake.createArgsForCall)]
	fake.createArgsForCall = append(fake.createArgsForCall, struct {
		arg1 context.Context
		arg2 string
		arg3 model.CreateNote
	}{arg1, arg2, arg3})
	stub := fake.CreateStub
	fakeReturns := fake.createReturns
	fake.recordInvocation("Create", []interface{}{arg1, arg2, arg3})
	fake.createMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2, arg3)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeNotesService) CreateCallCount() int {
	fake.createMutex.RLock()
	defer fake.createMutex.RUnlock()
	return len(fake.createArgsForCall)
}

func (fake *FakeNotesService) CreateCalls(stub func(context.Context, string, model.CreateNote) (*model.Note, error)) {
	fake.createMutex.Lock()
	defer fake.createMutex.Unlock()
	fake.CreateStub = stub
}

func (fake *FakeNotesService) CreateArgsForCall(i int) (context.Context, string, model.CreateNote) {
	fake.createMutex.RLock()
	defer fake.createMutex.RUnlock()
	argsForCall := fake.createArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesService) CreateReturns(result1 *model.Note, result2 error) {
	fake.createMutex.Lock()
	defer fake.createMutex.Unlock()
	fake.CreateStub = nil
	fake.createReturns = struct {
		result1 *model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) CreateReturnsOnCall(i int, result1 *model.Note, result2 error) {
	fake.createMutex.Lock()
	defer fake.createMutex.Unlock()
	fake.CreateStub = nil
	if fake.createReturnsOnCall == nil {
		fake.createReturnsOnCall = make(map[int]struct {
			result1 *model.Note
			result2 error
		})
	}
	fake.createReturnsOnCall[i] = struct {
		result1 *model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) Get(arg1 context.Context, arg2 string, arg3 string) (*model.Note, error) {
	fake.getMutex.Lock()
	ret, specificReturn := fake.getReturnsOnCall[len(fake.getArgsForCall)]
	fake.getArgsForCall = append(fake.getArgsForCall, struct {
		arg1 context.Context
		arg2 string
		arg3 string
	}{arg1, arg2, arg3})
	stub := fake.GetStub
	fakeReturns := fake.getReturns
	fake.recordInvocation("Get", []interface{}{arg1, arg2, arg3})
	fake.getMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2, arg3)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeNotesService) GetCallCount() int {
	fake.getMutex.RLock()
	defer fake.getMutex.RUnlock()
	return len(fake.getArgsForCall)
}

func (fake *FakeNotesService) GetCalls(stub func(context.Context, string, string) (*model.Note, error)) {
	fake.getMutex.Lock()
	defer fake.getMutex.Unlock()
	fake.GetStub = stub
}

func (fake *FakeNotesService) GetArgsForCall(i int) (context.Context, string, string) {
	fake.getMutex.RLock()
	defer fake.getMutex.RUnlock()
	argsForCall := fake.getArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesService) GetReturns(result1 *model.Note, result2 error) {
	fake.getMutex.Lock()
	defer fake.getMutex.Unlock()
	fake.GetStub = nil
	fake.getReturns = struct {
		result1 *model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) GetReturnsOnCall(i int, result1 *model.Note, result2 error) {
	fake.getMutex.Lock()
	defer fake.getMutex.Unlock()
	fake.GetStub = nil
	if fake.getReturnsOnCall == nil {
		fake.getReturnsOnCall = make(map[int]struct {
			result1 *model.Note
			result2 error
		})
	}
	fake.getReturnsOnCall[i] = struct {
		result1 *model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) List(arg1 context.Context, arg2 string, arg3 string) ([]*model.Note, error) {
	fake.listMutex.Lock()
	ret, specificReturn := fake.listReturnsOnCall[len(fake.listArgsForCall)]
	fake.listArgsForCall = append(fake.listArgsForCall, struct {
		arg1 context.Context
		arg2 string
		arg3 string
	}{arg1, arg2, arg3})
	stub := fake.ListStub
	fakeReturns := fake.listReturns
	fake.recordInvocation("List", []interface{}{arg1, arg2, arg3})
	fake.listMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2, arg3)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeNotesService) ListCallCount() int {
	fake.listMutex.RLock()
	defer fake.listMutex.RUnlock()
	return len(fake.listArgsForCall)
}

func (fake *FakeNotesService) ListCalls(stub func(context.Context, string, string) ([]*model.Note, error)) {
	fake.listMutex.Lock()
	defer fake.listMutex.Unlock()
	fake.ListStub = stub
}

func (fake *FakeNotesService) ListArgsForCall(i int) (context.Context, string, string) {
	fake.listMutex.RLock()
	defer fake.listMutex.RUnlock()
	argsForCall := fake.listArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesService) ListReturns(result1 []*model.Note, result2 error) {
	fake.listMutex.Lock()
	defer fake.listMutex.Unlock()
	fake.ListStub = nil
	fake.listReturns = struct {
		result1 []*model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) ListReturnsOnCall(i int, result1 []*model.Note, result2 error) {
	fake.listMutex.Lock()
	defer fake.listMutex.Unlock()
	fake.ListStub = nil
	if fake.listReturnsOnCall == nil {
		fake.listReturnsOnCall = make(map[int]struct {
			result1 []*model.Note
			result2 error
		})
	}
	fake.listReturnsOnCall[i] = struct {
		result1 []*model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) RemoveDeleted(arg1 context.Context, arg2 string) ([]*model.Note, error) {
	fake.removeDeletedMutex.Lock()
	ret, specificReturn := fake.removeDeletedReturnsOnCall[len(fake.removeDeletedArgsForCall)]
	fake.removeDeletedArgsForCall = append(fake.removeDeletedArgsForCall, struct {
		arg1 context.Context
		arg2 string
	}{arg1, arg2})
	stub := fake.RemoveDeletedStub
	fakeReturns := fake.removeDeletedReturns
	fake.recordInvocation("RemoveDeleted", []interface{}{arg1, arg2})
	fake.removeDeletedMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeNotesService) RemoveDeletedCallCount() int {
	fake.removeDeletedMutex.RLock()
	defer fake.removeDeletedMutex.RUnlock()
	return len(fake.removeDeletedArgsForCall)
}

func (fake *FakeNotesService) RemoveDeletedCalls(stub func(context.Context, string) ([]*model.Note, error)) {
	fake.removeDeletedMutex.Lock()
	defer fake.removeDeletedMutex.Unlock()
	fake.RemoveDeletedStub = stub
}

func (fake *FakeNotesService) RemoveDeletedArgsForCall(i int) (context.Context, string) {
	fake.removeDeletedMutex.RLock()
	defer fake.removeDeletedMutex.RUnlock()
	argsForCall := fake.removeDeletedArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2
}

func (fake *FakeNotesService) RemoveDeletedReturns(result1 []*model.Note, result2 error) {
	fake.removeDeletedMutex.Lock()
	defer fake.removeDeletedMutex.Unlock()
	fake.RemoveDeletedStub = nil
	fake.removeDeletedReturns = struct {
		result1 []*model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) RemoveDeletedReturnsOnCall(i int, result1 []*model.Note, result2 error) {
	fake.removeDeletedMutex.Lock()
	defer fake.removeDeletedMutex.Unlock()
	fake.RemoveDeletedStub = nil
	if fake.removeDeletedReturnsOnCall == nil {
		fake.removeDeletedReturnsOnCall = make(map[int]struct {
			result1 []*model.Note
			result2 error
		})
	}
	fake.removeDeletedReturnsOnCall[i] = struct {
		result1 []*model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) Update(arg1 context.Context, arg2 string, arg3 model.UpdateNote) (*model.Note, error) {
	fake.updateMutex.Lock()
	ret, specificReturn := fake.updateReturnsOnCall[len(fake.updateArgsForCall)]
	fake.updateArgsForCall = append(fake.updateArgsForCall, struct {
		arg1 context.Context
		arg2 string
		arg3 model.UpdateNote
	}{arg1, arg2, arg3})
	stub := fake.UpdateStub
	fakeReturns := fake.updateReturns
	fake.recordInvocation("Update", []interface{}{arg1, arg2, arg3})
	fake.updateMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2, arg3)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeNotesService) UpdateCallCount() int {
	fake.updateMutex.RLock()
	defer fake.updateMutex.RUnlock()
	return len(fake.updateArgsForCall)
}

func (fake *FakeNotesService) UpdateCalls(stub func(context.Context, string, model.UpdateNote) (*model.Note, error)) {
	fake.updateMutex.Lock()
	defer fake.updateMutex.Unlock()
	fake.UpdateStub = stub
}

func (fake *FakeNotesService) UpdateArgsForCall(i int) (context.Context, string, model.UpdateNote) {
	fake.updateMutex.RLock()
	defer fake.updateMutex.RUnlock()
	argsForCall := fake.updateArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesService) UpdateReturns(result1 *model.Note, result2 error) {
	fake.updateMutex.Lock()
	defer fake.updateMutex.Unlock()
	fake.UpdateStub = nil
	fake.updateReturns = struct {
		result1 *model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) UpdateReturnsOnCall(i int, result1 *model.Note, result2 error) {
	fake.updateMutex.Lock()
	defer fake.updateMutex.Unlock()
	fake.UpdateStub = nil
	if fake.updateReturnsOnCall == nil {
		fake.updateReturnsOnCall = make(map[int]struct {
			result1 *model.Note
			result2 error
		})
	}
	fake.updateReturnsOnCall[i] = struct {
		result1 *model.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesService) Invocations() map[string][][]interface{} {
	fake.invocationsMutex.RLock()
	defer fake.invocationsMutex.RUnlock()
	fake.createMutex.RLock()
	defer fake.createMutex.RUnlock()
	fake.getMutex.RLock()
	defer fake.getMutex.RUnlock()
	fake.listMutex.RLock()
	defer fake.listMutex.RUnlock()
	fake.removeDeletedMutex.RLock()
	defer fake.removeDeletedMutex.RUnlock()
	fake.updateMutex.RLock()
	defer fake.updateMutex.RUnlock()
	copiedInvocations := map[string][][]interface{}{}
	for key, value := range fake.invocations {
		copiedInvocations[key] = value
	}
	return copiedInvocations
}

func (fake *FakeNotesService) recordInvocation(key string, args []interface{}) {
	fake.invocationsMutex.Lock()
	defer fake.invocationsMutex.Unlock()
	if fake.invocations == nil {
		fake.invocations = map[string][][]interface{}{}
	}
	if fake.invocations[key] == nil {
		fake.invocations[key] = [][]interface{}{}
	}
	fake.invocations[key] = append(fake.invocations[key], args)
}

var _ notes.NotesService = new(FakeNotesService)
