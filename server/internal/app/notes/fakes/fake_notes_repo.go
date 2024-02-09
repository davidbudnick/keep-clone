// Code generated by counterfeiter. DO NOT EDIT.
package fakes

import (
	"context"
	"server/graph/model"
	"server/internal/app/notes"
	"sync"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type FakeNotesRepo struct {
	CreateStub        func(context.Context, string, model.CreateNote) (*mongo.InsertOneResult, error)
	createMutex       sync.RWMutex
	createArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 model.CreateNote
	}
	createReturns struct {
		result1 *mongo.InsertOneResult
		result2 error
	}
	createReturnsOnCall map[int]struct {
		result1 *mongo.InsertOneResult
		result2 error
	}
	DeleteStub        func(context.Context, string, string) (*primitive.ObjectID, error)
	deleteMutex       sync.RWMutex
	deleteArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 string
	}
	deleteReturns struct {
		result1 *primitive.ObjectID
		result2 error
	}
	deleteReturnsOnCall map[int]struct {
		result1 *primitive.ObjectID
		result2 error
	}
	GetStub        func(context.Context, string, string) (*notes.Note, error)
	getMutex       sync.RWMutex
	getArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 string
	}
	getReturns struct {
		result1 *notes.Note
		result2 error
	}
	getReturnsOnCall map[int]struct {
		result1 *notes.Note
		result2 error
	}
	ListStub        func(context.Context, string, string) ([]notes.Note, error)
	listMutex       sync.RWMutex
	listArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 string
	}
	listReturns struct {
		result1 []notes.Note
		result2 error
	}
	listReturnsOnCall map[int]struct {
		result1 []notes.Note
		result2 error
	}
	RemoveDeletedStub        func(context.Context, string) error
	removeDeletedMutex       sync.RWMutex
	removeDeletedArgsForCall []struct {
		arg1 context.Context
		arg2 string
	}
	removeDeletedReturns struct {
		result1 error
	}
	removeDeletedReturnsOnCall map[int]struct {
		result1 error
	}
	UpdateStub        func(context.Context, string, model.UpdateNote) error
	updateMutex       sync.RWMutex
	updateArgsForCall []struct {
		arg1 context.Context
		arg2 string
		arg3 model.UpdateNote
	}
	updateReturns struct {
		result1 error
	}
	updateReturnsOnCall map[int]struct {
		result1 error
	}
	invocations      map[string][][]interface{}
	invocationsMutex sync.RWMutex
}

func (fake *FakeNotesRepo) Create(arg1 context.Context, arg2 string, arg3 model.CreateNote) (*mongo.InsertOneResult, error) {
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

func (fake *FakeNotesRepo) CreateCallCount() int {
	fake.createMutex.RLock()
	defer fake.createMutex.RUnlock()
	return len(fake.createArgsForCall)
}

func (fake *FakeNotesRepo) CreateCalls(stub func(context.Context, string, model.CreateNote) (*mongo.InsertOneResult, error)) {
	fake.createMutex.Lock()
	defer fake.createMutex.Unlock()
	fake.CreateStub = stub
}

func (fake *FakeNotesRepo) CreateArgsForCall(i int) (context.Context, string, model.CreateNote) {
	fake.createMutex.RLock()
	defer fake.createMutex.RUnlock()
	argsForCall := fake.createArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesRepo) CreateReturns(result1 *mongo.InsertOneResult, result2 error) {
	fake.createMutex.Lock()
	defer fake.createMutex.Unlock()
	fake.CreateStub = nil
	fake.createReturns = struct {
		result1 *mongo.InsertOneResult
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesRepo) CreateReturnsOnCall(i int, result1 *mongo.InsertOneResult, result2 error) {
	fake.createMutex.Lock()
	defer fake.createMutex.Unlock()
	fake.CreateStub = nil
	if fake.createReturnsOnCall == nil {
		fake.createReturnsOnCall = make(map[int]struct {
			result1 *mongo.InsertOneResult
			result2 error
		})
	}
	fake.createReturnsOnCall[i] = struct {
		result1 *mongo.InsertOneResult
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesRepo) Delete(arg1 context.Context, arg2 string, arg3 string) (*primitive.ObjectID, error) {
	fake.deleteMutex.Lock()
	ret, specificReturn := fake.deleteReturnsOnCall[len(fake.deleteArgsForCall)]
	fake.deleteArgsForCall = append(fake.deleteArgsForCall, struct {
		arg1 context.Context
		arg2 string
		arg3 string
	}{arg1, arg2, arg3})
	stub := fake.DeleteStub
	fakeReturns := fake.deleteReturns
	fake.recordInvocation("Delete", []interface{}{arg1, arg2, arg3})
	fake.deleteMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2, arg3)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeNotesRepo) DeleteCallCount() int {
	fake.deleteMutex.RLock()
	defer fake.deleteMutex.RUnlock()
	return len(fake.deleteArgsForCall)
}

func (fake *FakeNotesRepo) DeleteCalls(stub func(context.Context, string, string) (*primitive.ObjectID, error)) {
	fake.deleteMutex.Lock()
	defer fake.deleteMutex.Unlock()
	fake.DeleteStub = stub
}

func (fake *FakeNotesRepo) DeleteArgsForCall(i int) (context.Context, string, string) {
	fake.deleteMutex.RLock()
	defer fake.deleteMutex.RUnlock()
	argsForCall := fake.deleteArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesRepo) DeleteReturns(result1 *primitive.ObjectID, result2 error) {
	fake.deleteMutex.Lock()
	defer fake.deleteMutex.Unlock()
	fake.DeleteStub = nil
	fake.deleteReturns = struct {
		result1 *primitive.ObjectID
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesRepo) DeleteReturnsOnCall(i int, result1 *primitive.ObjectID, result2 error) {
	fake.deleteMutex.Lock()
	defer fake.deleteMutex.Unlock()
	fake.DeleteStub = nil
	if fake.deleteReturnsOnCall == nil {
		fake.deleteReturnsOnCall = make(map[int]struct {
			result1 *primitive.ObjectID
			result2 error
		})
	}
	fake.deleteReturnsOnCall[i] = struct {
		result1 *primitive.ObjectID
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesRepo) Get(arg1 context.Context, arg2 string, arg3 string) (*notes.Note, error) {
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

func (fake *FakeNotesRepo) GetCallCount() int {
	fake.getMutex.RLock()
	defer fake.getMutex.RUnlock()
	return len(fake.getArgsForCall)
}

func (fake *FakeNotesRepo) GetCalls(stub func(context.Context, string, string) (*notes.Note, error)) {
	fake.getMutex.Lock()
	defer fake.getMutex.Unlock()
	fake.GetStub = stub
}

func (fake *FakeNotesRepo) GetArgsForCall(i int) (context.Context, string, string) {
	fake.getMutex.RLock()
	defer fake.getMutex.RUnlock()
	argsForCall := fake.getArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesRepo) GetReturns(result1 *notes.Note, result2 error) {
	fake.getMutex.Lock()
	defer fake.getMutex.Unlock()
	fake.GetStub = nil
	fake.getReturns = struct {
		result1 *notes.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesRepo) GetReturnsOnCall(i int, result1 *notes.Note, result2 error) {
	fake.getMutex.Lock()
	defer fake.getMutex.Unlock()
	fake.GetStub = nil
	if fake.getReturnsOnCall == nil {
		fake.getReturnsOnCall = make(map[int]struct {
			result1 *notes.Note
			result2 error
		})
	}
	fake.getReturnsOnCall[i] = struct {
		result1 *notes.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesRepo) List(arg1 context.Context, arg2 string, arg3 string) ([]notes.Note, error) {
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

func (fake *FakeNotesRepo) ListCallCount() int {
	fake.listMutex.RLock()
	defer fake.listMutex.RUnlock()
	return len(fake.listArgsForCall)
}

func (fake *FakeNotesRepo) ListCalls(stub func(context.Context, string, string) ([]notes.Note, error)) {
	fake.listMutex.Lock()
	defer fake.listMutex.Unlock()
	fake.ListStub = stub
}

func (fake *FakeNotesRepo) ListArgsForCall(i int) (context.Context, string, string) {
	fake.listMutex.RLock()
	defer fake.listMutex.RUnlock()
	argsForCall := fake.listArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesRepo) ListReturns(result1 []notes.Note, result2 error) {
	fake.listMutex.Lock()
	defer fake.listMutex.Unlock()
	fake.ListStub = nil
	fake.listReturns = struct {
		result1 []notes.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesRepo) ListReturnsOnCall(i int, result1 []notes.Note, result2 error) {
	fake.listMutex.Lock()
	defer fake.listMutex.Unlock()
	fake.ListStub = nil
	if fake.listReturnsOnCall == nil {
		fake.listReturnsOnCall = make(map[int]struct {
			result1 []notes.Note
			result2 error
		})
	}
	fake.listReturnsOnCall[i] = struct {
		result1 []notes.Note
		result2 error
	}{result1, result2}
}

func (fake *FakeNotesRepo) RemoveDeleted(arg1 context.Context, arg2 string) error {
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
		return ret.result1
	}
	return fakeReturns.result1
}

func (fake *FakeNotesRepo) RemoveDeletedCallCount() int {
	fake.removeDeletedMutex.RLock()
	defer fake.removeDeletedMutex.RUnlock()
	return len(fake.removeDeletedArgsForCall)
}

func (fake *FakeNotesRepo) RemoveDeletedCalls(stub func(context.Context, string) error) {
	fake.removeDeletedMutex.Lock()
	defer fake.removeDeletedMutex.Unlock()
	fake.RemoveDeletedStub = stub
}

func (fake *FakeNotesRepo) RemoveDeletedArgsForCall(i int) (context.Context, string) {
	fake.removeDeletedMutex.RLock()
	defer fake.removeDeletedMutex.RUnlock()
	argsForCall := fake.removeDeletedArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2
}

func (fake *FakeNotesRepo) RemoveDeletedReturns(result1 error) {
	fake.removeDeletedMutex.Lock()
	defer fake.removeDeletedMutex.Unlock()
	fake.RemoveDeletedStub = nil
	fake.removeDeletedReturns = struct {
		result1 error
	}{result1}
}

func (fake *FakeNotesRepo) RemoveDeletedReturnsOnCall(i int, result1 error) {
	fake.removeDeletedMutex.Lock()
	defer fake.removeDeletedMutex.Unlock()
	fake.RemoveDeletedStub = nil
	if fake.removeDeletedReturnsOnCall == nil {
		fake.removeDeletedReturnsOnCall = make(map[int]struct {
			result1 error
		})
	}
	fake.removeDeletedReturnsOnCall[i] = struct {
		result1 error
	}{result1}
}

func (fake *FakeNotesRepo) Update(arg1 context.Context, arg2 string, arg3 model.UpdateNote) error {
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
		return ret.result1
	}
	return fakeReturns.result1
}

func (fake *FakeNotesRepo) UpdateCallCount() int {
	fake.updateMutex.RLock()
	defer fake.updateMutex.RUnlock()
	return len(fake.updateArgsForCall)
}

func (fake *FakeNotesRepo) UpdateCalls(stub func(context.Context, string, model.UpdateNote) error) {
	fake.updateMutex.Lock()
	defer fake.updateMutex.Unlock()
	fake.UpdateStub = stub
}

func (fake *FakeNotesRepo) UpdateArgsForCall(i int) (context.Context, string, model.UpdateNote) {
	fake.updateMutex.RLock()
	defer fake.updateMutex.RUnlock()
	argsForCall := fake.updateArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3
}

func (fake *FakeNotesRepo) UpdateReturns(result1 error) {
	fake.updateMutex.Lock()
	defer fake.updateMutex.Unlock()
	fake.UpdateStub = nil
	fake.updateReturns = struct {
		result1 error
	}{result1}
}

func (fake *FakeNotesRepo) UpdateReturnsOnCall(i int, result1 error) {
	fake.updateMutex.Lock()
	defer fake.updateMutex.Unlock()
	fake.UpdateStub = nil
	if fake.updateReturnsOnCall == nil {
		fake.updateReturnsOnCall = make(map[int]struct {
			result1 error
		})
	}
	fake.updateReturnsOnCall[i] = struct {
		result1 error
	}{result1}
}

func (fake *FakeNotesRepo) Invocations() map[string][][]interface{} {
	fake.invocationsMutex.RLock()
	defer fake.invocationsMutex.RUnlock()
	fake.createMutex.RLock()
	defer fake.createMutex.RUnlock()
	fake.deleteMutex.RLock()
	defer fake.deleteMutex.RUnlock()
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

func (fake *FakeNotesRepo) recordInvocation(key string, args []interface{}) {
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

var _ notes.NotesRepo = new(FakeNotesRepo)
